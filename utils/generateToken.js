// const jwt= require("jsonwebtoken");
// const generateToken=(user)=>{
// return jwt.sign({email,id:user._id},process.env.JWT_KEY);
// };

// module.exports.generateToken=generateToken;

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,  // ✅ get email from user object
      id: user._id,       // ✅ get id from user object
    },
    process.env.JWT_KEY,  // ✅ your secret key
    { expiresIn: "7d" }   // ✅ optional but recommended
  );
};

module.exports.generateToken = generateToken;
