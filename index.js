const express = require("express");
const productRouter = require("./routes/products.js");
const Product = require("./models/product.js");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
 mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true })
     .then(() => console.log('DB connected'))
     .catch( (error) => error);
  
  //futnitureapp
  app.use(express.json({limit:"10mb"}))
  app.use(express.urlencoded({limit:"10mb", extended:true}));

  
  app.get("/", (req, res) => {
    console.log("geting")
    res.send("wellcom")
    
});
app.get("/create",async (req,res) => {
  const newProduct = new Product(
 { title:"Title here",
    supplier:"xyz",
    imageUrl:"url",
    description:"discraption",
    product_location:"location" }
      );
      try{
      await newProduct.save();
      res.status(200).json("Prduct Created Successfully")
    }
    catch(error){
      res.status(500).json("Prduct Creation filed ")
    }
  res.send("product created");
})

app.listen(process.env.PORT,() => {
  console.log("connected");
  
  
})
module.exports = app;