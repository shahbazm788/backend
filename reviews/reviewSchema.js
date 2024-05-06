const mongoose = require("mongoose");



const ReviewSchema = new mongoose.Schema({
    productId : {type:String,required:true},
    userId : {type:String,required:true},
    userName : {type:String,required:true},
    reviewText : {type:String,required:true},
    stars : {type:Number,required:true},
    helpFull : {type:Number,default:0},
    notHelpFull : {type:Number,default:0},
    submitAt : {type:Number,required:true},
  },
  {timestamps:true}
  );

module.exports = mongoose.model("Reviews",ReviewSchema);