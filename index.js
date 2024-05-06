const express = require("express");
const productRouter = require("./routes/products.js");
const Product = require("./models/product.js");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRouter = require("./auth/user_router.js");
const reviewRouter = require("./reviews/reviews_router.js");
const catRouter = require("./categories/category_routs.js");


dotenv.config();
 mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true })
     .then(() => console.log('DB connected'))
     .catch( (error) => error);
     
 app.use(cors({
  credentials: true,
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
     
    })
  )
     
     
  app.use(express.static(__dirname+"/public"));
  //futnitureapp
  app.use(express.json({limit:"10mb"}))
  app.use(express.urlencoded({limit:"10mb", extended:true}));
app.use("/products",productRouter);
app.use("/user",userRouter);
app.use("/review",reviewRouter);
app.use("/catagory",catRouter);




  app.get("/", (req, res) => {
    console.log("geting")
    res.send("wellcom");
});
app.get("/product/create",async (req,res) => {  
  const newProduct = new Product(
 { title:"beutiful Product Title ",
    supplier:"xyz",
    category:"woman",
    sub_category:"womans's Fasion",
    imageUrl:"pexels-thgusstavo-santana-2533323.jpg",
    price:"9000",
    description:"Top class curtains discraption",
    product_location:"location" }
      );
      try{
      await newProduct.save();
      res.status(200).json("Prduct Created Successfully")
    }
    catch(error){
      res.status(500).json("Prduct Creation filed ")
    }
  
});


//search product 
/*app.get("/search",async (req,res) => {
  const title = "First Product Title ";
  const product = await Product.find({title});
  console.log(product);
  res.send(product)
});*/
app.get("/products/search",productRouter)
app.get("/search",(req,res) => {
  console.log(req.body);
  res.send("ok")
})



app.post("/uploadimg",(req,res) => {
  console.log(req.body)
})
app.listen(process.env.PORT,() => {
  console.log("connected");
})
module.exports = app;