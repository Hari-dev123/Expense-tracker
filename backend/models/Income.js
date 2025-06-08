const mongoose = require("mongoose");
const User  =  require('./User.js');

const incomeSchema = new mongoose.Schema({
     userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : User,
            required : true,
     },
     source : {
        type : String,
        required : true,
     },
     amount : {
         type : Number,
         required : true,
     },
    
        date : {
            type : Date,
            
            default : Date.now
        },
},
{timestamps : true});


incomeSchema.pre("save", function (next) {
  if (!this.date || isNaN(new Date(this.date).getTime())) {
    this.date = new Date();
  }
  next();
});

module.exports = mongoose.model("Income", incomeSchema);