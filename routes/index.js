// const express=require("express");
// const router=express.Router();
// const isLoggedIn=require("../middlewares/isLoggedIn");
// const Product = require("../models/product-model");
// const userModel=require("../models/user-model");
// router.get("/",function(req,res){
//     let error=req.flash("error");
//     res.render("index",{error,loggedin:false});

// });


// router.get("/shop",isLoggedIn, async function(req,res){
//     let products= await Product.find();
//    let success= req.flash("success")|| [];
//     res.render("shop",{products,success});
// });

// router.get("/addtocart/:productid",isLoggedIn, async function(req,res){
//    let user = await userModel.findOne({email:req.user.email});
//    user.cart.push(req.params.productid);
//    await user.save();
//    req.flash("success","Added to cart");
//    res.redirect("/shop");
// });



// router.get("/logout",isLoggedIn, async function(req,res){

// let products = await Product.find();
//     let success = req.flash("success");
//     res.render("shop", { products, success });
//     //res.render("shop");
// })

// module.exports=router; 


// const express = require("express");
// const router = express.Router();
// const isLoggedIn = require("../middlewares/isLoggedIn");
// const Product = require("../models/product-model");
// const userModel = require("../models/user-model");

// // Home route
// router.get("/", function (req, res) {
//   let error = req.flash("error") || [];
//   res.render("index", { error, loggedin: false });
// });

// // Shop route
// router.get("/shop", isLoggedIn, async function (req, res) {
//   let products = await Product.find();
//   let success = req.flash("success") || [];
//   res.render("shop", { products, success });
// });


// router.get("/cart", isLoggedIn, async function (req, res) {
//  let user = await userModel
//  .findOne({email:req.user.email})
// .populate("cart");

// //const bill= Number(user.cart[0].price)+20 - Number(user.cart[0].discount);
// let totalPrice = 0;
//   user.cart.forEach(product => {
//     totalPrice += Number(product.price) - Number(product.discount || 0);
//   });

//   const platformFee = 20; // fixed platform fee
//   const bill = totalPrice + platformFee;

//   res.render("cart",{user,bill});
// });

// // Add to cart
// router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
   
//   let user = await userModel.findOne({ email: req.user.email });
//   user.cart.push(req.params.productid);
//   await user.save();
//   req.flash("success", "✅ Added to cart successfully!");
//   res.redirect("/shop");
// });

// // Logout route
// router.get("/logout", isLoggedIn, async function (req, res) {
//   let products = await Product.find();
//   let success = req.flash("success") || [];
//   res.render("shop", { products, success });
// });

// module.exports = router;









const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Product = require("../models/product-model");
const userModel = require("../models/user-model");

// Home route
router.get("/", function (req, res) {
  let error = req.flash("error") || [];
  res.render("index", { error, loggedin: false });
});

// Shop route
router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await Product.find();
  let success = req.flash("success") || [];
  res.render("shop", { products, success });
});

// Cart route
router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  // Prepare cart details with quantity and total per product
  let cartDetails = user.cart.map((product) => {
    let quantity = (user.cartQuantity && user.cartQuantity[product._id]) || 1;
    let total = (Number(product.price) - Number(product.discount || 0)) * quantity;
    return {
      product,
      quantity,
      total,
    };
  });

  // Total bill calculation
  let totalPrice = cartDetails.reduce((acc, item) => acc + item.total, 0);
  const platformFee = 20; // fixed
  const bill = totalPrice + platformFee;

  res.render("cart", { user, cartDetails, bill });
});

// Add to cart
router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });

  // Check if product already exists in cart
  let existingProductIndex = user.cart.findIndex(
    (p) => p.toString() === req.params.productid
  );

  if (existingProductIndex === -1) {
    // Add new product
    user.cart.push(req.params.productid);
  } else {
    // Increment quantity
    if (!user.cartQuantity) user.cartQuantity = {};
    user.cartQuantity[req.params.productid] =
      (user.cartQuantity[req.params.productid] || 1) + 1;
  }

  await user.save();
  req.flash("success", "✅ Added to cart successfully!");
  res.redirect("/shop");
});

// Logout route
router.get("/logout", isLoggedIn, async function (req, res) {
  let products = await Product.find();
  let success = req.flash("success") || [];
  res.render("shop", { products, success });
});

module.exports = router;






