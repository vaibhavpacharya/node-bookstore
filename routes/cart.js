var express    = require("express");
var router     = express.Router();
var Book       = require("../models/book");
var middleware = require("../middleware");

// Index
router.get("/",middleware.isLoggedIn, function(req,res){
// Get all books from the DB
var cart = req.session.cart;
console.log(cart);
var displayCart = {items:[]};
var total = 0;

//Get total
for(var item in cart){
  displayCart.items.push(cart[item]);
  total += (cart[item].qty * cart[item].price);
}
displayCart.total = total;

Book.findById(req.params.id,function(err, foundBook){
    if(err){
      console.log("SOMETHING GOT WRONG!");
      console.log(err);
    }
    else {
      // Render cart
      res.render("cart/index",{cart: displayCart, total: total, books: foundBook});

        }
    });
});

router.post("/:id", middleware.isLoggedIn, function(req,res){
  req.session.cart = req.session.cart || {};
  var cart = req.session.cart;

  // Create a new book and save to the DB
  Book.findById(req.params.id,function(err, foundBook){
    if(err){
      console.log(err);
    }
    if(cart[req.params.id]){
      cart[req.params.id].qty++;
    }
    else{
      cart[req.params.id] = {
        item: foundBook._id,
        title: foundBook.title,
        price: foundBook.price,
        qty: 1
      }
    }
        //redirect to cart page
        res.redirect("/cart");
    });
});
module.exports = router;
