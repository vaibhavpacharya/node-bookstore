var express    = require("express");
var router     = express.Router();
var Book       = require("../models/book");
var middleware = require("../middleware");

// Index
router.get("/",function(req,res){
// Get all books from the DB
Book.find({},function(err,allBooks){
  if(err){
    console.log("SOMETHING GOT WRONG!");
    console.log(err);
  }
  else {
    // THen render them to the page
        res.render("books/index",{books:allBooks, page: 'books'});
      }
    });
});

// CREATE Add new books
router.post("/", middleware.isLoggedIn, function(req,res){
    // get data from form
  var name        =  req.body.name;
  var price       =  req.body.price;
  var image       =  req.body.image;
  var description =  req.body.description;
  var author      = {
    id:       req.user._id,
    username: req.user.username
  };
  var newBook = {name:name, price: price, image:image, description:description, author:author};

  // Create a new book and save to the DB
  Book.create(newBook,function(err,newlyCreated){
    if(err){
      console.log(err);
    }
    else{
        //redirect to books page
        // console.log(newlyCreated);
        res.redirect("/books");
        }
    });
  });

// NEW-Show form to create new books
router.get("/new", middleware.isLoggedIn, function(req,res){
  res.render("books/form");
});

//SHOW- Show info about one book
router.get("/:id",function(req,res){
  //find the book with provided ID
  // FindById(id,callback)
  Book.findById(req.params.id).populate("comments").exec(function(err,foundBook){
    if(err){
      console.log(err);
    }else{
      //render the show page
      res.render("books/show",{book: foundBook});
        }
  });
});

//EDIT book routes
router.get("/:id/edit",middleware.checkBookOwnership,function(req,res){
    Book.findById(req.params.id,function(err, foundBook){
          res.render("books/edit",{book: foundBook});
    });
});

//UPDATE book route
router.put("/:id",middleware.checkBookOwnership,function(req,res){
    var newData   = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price};
  //find the correct recipe
  Book.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedBook){
    if(err){
      req.flash("error", err.message);
      res.redirect("/books");
    } else {
      req.flash("success", "Successfully updated!");
      res.redirect("/books/" +updatedBook._id);
          }
    });
});

//DESTROY book route
router.delete("/:id",middleware.checkBookOwnership,function(req,res){
  Book.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/books");
    } else{
    res.redirect("/books");
  }
  });
});
module.exports = router;
