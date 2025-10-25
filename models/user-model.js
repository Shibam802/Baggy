// const mongoose= require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/Baggy");


// const userSchema= mongoose.Schema({
//      fullname:{
//         type:String,
//         minLength:3,
//         trim:3,
//     },
//     email: String,
//     password:String,
//     cart:{
//         type: Array,
//         default:[]
//     },
//     isadmin:Boolean,
//     orders:{
//         type:Array,
//         default:[]
//     },
//     contact:Number,
//     picture:String,
// });

// module.exports=mongoose.model("user",userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    trim: true, // ✅ trim should be Boolean, not 3
  },
  email: {
    type: String,
    required: true,
    unique: true, // optional but recommended
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product",
    
  },
],
  isadmin: {
    type: Boolean,
    default: false,
  },
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
  },
  picture: {
    type: String,
  },
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.user || mongoose.model("user", userSchema);
