const mongoose = require("mongoose");


const catagorySchema = new mongoose.Schema({
  catagoryName : {type:String,required:true,min:3},
  iconName:{type:String,required:true,}
});


module.exports = mongoose.model("Catagory",catagorySchema);


