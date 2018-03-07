var express     = require("express");
var router      = express.Router({mergeParams: true});
var Book        = require("../models/book");
var Comments    = require("../models/comment");
var middleware  = require("../middleware");


//Comments New
router.get("/new", middleware.isLoggedIn, function(req,res){
  //find campgrounds
  Book.findById(req.params.id,function(err,book){
    if(err){
      console.log(err);
    }else{
      //render the comments page
      res.render("comments/form",{book: book});
        }
      });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req,res){
  //lookup book using id
  Book.findById(req.params.id,function(err,book){
    if(err){
      req.flash("error","Something went wrong.");
      console.log(err);
      res.redirect("/books");
    }else{
      Comments.create(req.body.comment,function(err,comment){
        if(err){
          console.log(err);
        } else{
          //add username and ID to the comment
          // comment.author.id = req.user._id;
          // comment.author.username = req.user.username;
          comment.author.id       = req.user._id;
          comment.author.username = req.user.username;
          console.log("New comment user will be === " +comment.author.username);
          //save comment
          comment.save();
          book.comments.push(comment);
          // console.log(comment);
          book.save();
          console.log(comment);
          req.flash("success","Successfully added the comment.");
          res.redirect('/books/' + book._id);
        }

      });
    }
  });
});
//Comment Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
  Comments.findById(req.params.comment_id, function(err,foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {book_id: req.params.id, comment: foundComment});
    }
  });
});

//Comment Update Route
router.put("/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
      if(err){
        res.redirect("back");
      } else {
        req.flash("success","Comment Updated Successfully.");
        res.redirect("/books/" + req.params.id);
      }
    });
});

//Comment Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req,res){
  Comments.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success","Comment deleted.");
      res.redirect("/books/" +req.params.id);
    }
  })
});

module.exports = router;
