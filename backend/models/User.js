const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
     fullName : {
        type : String,
        required : true,
     },
     email : {
         type : String,
            required : true,
            unique : true,
     },
     password : {
         type : String,
         required : true,
         length : 8,
     },
},{timestamps : true});

module.exports = mongoose.model("User", userSchema);