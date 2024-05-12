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
const DB = "mongodb+srv://shahbazm788:wpd.jj.dpw@cluster0.ugwiuxd.mongodb.net/futnitureapp";
const Addusers  = require("./auth/registor_user_shcema.js");
const Catagory = require("./categories/category_schema.js");
/* 

*/
//dotenv.config();
 mongoose.connect(
   DB,
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
/*app.use("/products",productRouter);
app.use("/user",userRouter);
app.use("/review",reviewRouter);
app.use("/catagory",catRouter);

*/


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


//geting all products
app.get("/products",  async (req,res) => {
    try{
      const products = await Product.find().sort({createdAt:-1});
      res.status(200).json(products);
      console.log(products)
    }
    catch(error){
      res.status(500).json("filed to get products")
    }
  } );


// Get products by search
app.get("/search/:key", async (req,res) => {
  console.log(req.body)
 try{
    const result = await Product.aggregate(
      [
{
  $search: {
    index: "fur",
    text: {
      query: req.params.key,
      path: {
        wildcard: "*"
      }
    }
  }
}
]
      );
      res.status(200).json(result);
      console.log(result)
  }
  catch(error){
    res.status(500).json("not found");
  }
});

//geting by catagoryy

app.post("/getbycat",async (req,res) => {
  const catName = req.body.catName;
  //console.log(catName)
  try{
    const result = await Product.find({"category":catName});
    res.send(result);
  }
  catch(err){
    console.log(err)
  }
});


app.get("/catagory",async (req,res) => {
    const allCat = await Catagory.find();
    allCat ? res.send(allCat): res.send("no catagory found");
  });
app.post("/products/getbycat",async (req,res) => {
    const catName = req.body.catName;
    //console.log(catName)
    try{
      const result = await Product.find({"category":catName});
      res.send(result);
    }
    catch(err){
      console.log(err)
    }
  })






app.post("/reguser",async (req,res) => {
  // console.log(req.body);
  //  res.json("ok");
        try {
        const newUser =  new Addusers(req.body);
        const token = await newUser.genrateToken();
        const result = await newUser.save();
        // console.log(token)
        res.cookie("front_jwt",token,{
            withCredentials: true,
            httpOnly: false,
          });
        res.send(result);
     
        console.log(result);
    } catch (e) {
        console.error('Error', e)
    }
  });


  app.post("/login",async (req,res,next) => {
    const {email,password} = req.body;
   // const data = await Addusers.find();
    //const getData = await Addusers.findOne({email:email});
   // console.log(getData)
   try{
      const getData = await Addusers.findOne({email:email});
     // const _id = getData._id;
       const userPass = getData.password;
            if(getData != null && userPass === password){
              const _id = getData._id;
              const updatedUser = await Addusers.findOneAndUpdate({_id},{$set:{
                   login:true
               }},{
                   new:true
               })
       /*     const token = getData.tokens.token;
              res.cookie("jwt", token, {
               withCredentials: true,
               httpOnly: false,
             });*/
             res.json(updatedUser);
             console.log(updatedUser);
            }
        
    }
    catch(err){
      console.log(err)
    }
    
  });




app.post("/uploadimg",(req,res) => {
  console.log(req.body)
})
app.listen(process.env.PORT,() => {
  console.log("connected");
}) 



