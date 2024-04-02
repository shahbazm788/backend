const Product = require("../models/product.js");


module.exports={
  vreateProduct: async (req,res) => {
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
}