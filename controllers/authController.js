// const userModel=require("../models/user-model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const {generateToken}= require("../utils/generateToken");

// module.exports.registerUser= async function(req,res){
//    try{
//      let {email,password,fullname}=req.body;

// let user =await userModel.findOne({email:email});
// if(user) return res.status(401).send("you alrady have an account.");

// bcrypt.genSalt(10,function(err,salt){
//     bcrypt.hash(password,salt,async function(err,hash){
//         if(err) return res.send(err.message);
//         else {
//             let user=await userModel.create({
//         email,
//         password,
//         fullname,
//      })
//      res.send(user);
//         }
//     });
// });


// let token=generateToken(user);
// res.cookie("token",token);
// res.send("user created successfully")



// } catch(err){
// res.send(err.message);
//    }
// };

// module.exports.loginUser=async function(req,res){
//     let{email,password}=req.body;

//     let user = await userModel.findOne({email:email});
//    if(!user){
// req.flash("error","Email or Password incorrect");
//        return res.redirect("/")            }

//     bcrypt.compare(password,user.password,function(err,result){
//         if(result){
//             let token=generateToken(user);
//             res.cookie("token",token);
//            res.redirect("/shop");
//         }
//         else{
//             req.flash("error","Email or Password incorrect");
//         return res.redirect("/");
//         }
//     })
// }


// const userModel = require("../models/user-model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { generateToken } = require("../utils/generateToken");

// module.exports.registerUser = async function (req, res) {
//   try {
//     const { email, password, fullname } = req.body;

//     // Check if user already exists
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) return res.status(401).send("You already have an account.");

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     // Create user
//     const user = await userModel.create({
//       email,
//       password: hash,
//       fullname,
//     });

//     // Generate JWT token
//     const token = generateToken(user);
//     res.cookie("token", token);

//     // Send response once
//     return res.status(201).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err.message);
//   }
// };

// module.exports.loginUser = async function (req, res) {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(401).send("Email or password incorrect");

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).send("Email or password incorrect");

//     // Generate token
//     const token = generateToken(user);
//     res.cookie("token", token);

//     return res.status(200).send("Login successful");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err.message);
//   }
// };


// const userModel = require("../models/user-model");
// const bcrypt = require("bcrypt");
// const { generateToken } = require("../utils/generateToken");

// module.exports.registerUser = async function (req, res) {
//   try {
//     // ✅ Match frontend field order
//     const { fullname, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(401).send("You already have an account.");
//     }

//     // Hash password securely
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = await userModel.create({
//       fullname,
//       email,
//       password: hash,
//     });

//     // Generate JWT token
//     const token = generateToken(user);
//     res.cookie("token", token);

//     // Send success response
//     return res.status(201).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err.message);
//   }
// };

// module.exports.loginUser = async function (req, res) {
//   try {
//     // ✅ Match frontend field order
//     const { fullname, email, password } = req.body;

//     // Find user by email
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(401).send("Email or password incorrect");
//     }

//     // Compare password with hashed one
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send("Email or password incorrect");
//     }

//     // Generate JWT token
//     const token = generateToken(user);
//     res.cookie("token", token);

//     res.redirect("/shop");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err.message);
//   }
// };


// module.exports.logout= function(req,res){
//     res.cookie("token","");
//     res.redirect("/");
// };

const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function(req, res) {
  try {
    const { email, password, fullname } = req.body;

    let userExists = await userModel.findOne({ email });
    if (userExists) {
      req.flash("error", "You already have an account.");
      return res.redirect("/"); 
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/products/shop");

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports.loginUser = async function(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/products/shop");

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports.logout = function(req, res) {
  res.clearCookie("token");
  res.redirect("/");
};
