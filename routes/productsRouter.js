// const express=require("express");
// const router=express.Router();

// router.get("/",function(req,res){
//     res.send("hey");

// });

// module.exports=router; 
// const express = require("express");
// const router = express.Router();
// const Product = require("../models/product-model"); // adjust path
// const isLoggedIn = require("../middlewares/isLoggedIn"); // protects route

// // GET /products/shop
// router.get("/shop", isLoggedIn, async (req, res) => {
//   try {
//     const products = await Product.find({}); // fetch all products from DB
//     res.render("shop", { products, user: req.user }); // pass to EJS
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload=require("../config/multer-config");

// GET /products/shop
router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("shop", { products, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/create",upload.single("image"), async function(req,res){
try {let{
   name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
let product= await Product.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,

})
req.flash("success","Product created successfully");
res.redirect("/owners/admin");}
catch(err){
    res.send(err.message);
}
    })

module.exports = router;
