var express   = require("express");
var router    = express.Router();
var passport  = require("passport");
var User      = require("../models/user");
// Root Route
router.get("/", function(req,res){
  res.render("landing");
});

//================
//Auth Routes
//show register form
router.get("/register",function(req,res){
  res.render("register", {page: 'register'});
});

//sign up logic

router.post("/register",function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser,req.body.password,function(err,user){
    if(err){
      // req.flash("error",err.message);
      return res.render("register", {error: err.message});
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success","Welcome to the BookStore " +user.username);
      res.redirect("/books");
      // res.send("Signing you up...");
    });
  });
});

//SHOW LOGIN FORM
router.get("/login",function(req,res){
    res.render("login", {page: 'login'});
});

//handling login logic
//("/login",middlware,callback)
router.post("/login",passport.authenticate("local",
{
  successRedirect: "/books",
  failureRedirect: "/login"
}),function(req,res){
});

//add logout Routes
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Logged you out successfully")
  res.redirect("/books");
});

module.exports = router;
