// const mongoose= require('mongoose');



// const productSchema= mongoose.Schema({
//    image:String,
//    name:String,
//    price:Number,
//    discount:{
//     type:Number,
//     default:0,
//    },
//    bgcolor:String,
//    panelcolor:String,
//    textcolor:String,
// });

// module.exports=mongoose.model("user",productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: Buffer,       // URL or base64 string
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.product || mongoose.model("product", productSchema);
