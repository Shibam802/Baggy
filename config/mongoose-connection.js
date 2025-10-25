const mongoose= require('mongoose');
const config=require("config");
const dbqr= require("debug")("development:mongoose");

mongoose.
connect(`${config.get("MONGODB_URI")}/Baggy`)
.then(function(){
     dbqr("connected");
})
.catch(function(){
     dbqr(err);
})
module.exports= mongoose.connection;