const Product = require("../models/product.js");


module.exports={
  createProduct: async (req,res) => {
    const newProduct = new Product(req.body);
    
    try{
      await newProduct.save();
      res.status(200).json("Prduct Created Successfully")
    }
    catch(error){
      res.status(500).json("Prduct Creation filed ")
    }
  },
  getAllProducts : async (req,res) => {
    try{
      const products = await Product.find().sort({createdAt:-1});
      res.status(200).json(products);
      console.log(products)
    }
    catch(error){
      res.status(500).json("filed to get products")
    }
  },
  getOneProduct : async (req,res) => {
    try{
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    }
    catch(error){
      res.status(500).json("filed to get product")
    }
  },
  searchProduct: async (req,res) => {
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
  },
  getByCategory: async (req,res) => {
    const catName = req.body.catName;
    //console.log(catName)
    try{
      const result = await Product.find({"category":catName});
      res.send(result);
    }
    catch(err){
      console.log(err)
    }
  },
}