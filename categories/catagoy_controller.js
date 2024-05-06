const Catagory = require("./category_schema.js");


module.exports = {
  createCat: async (req,res) => {
     const catName = req.body.catName;
     const iconName = req.body.iconName;
       const cat = new Catagory({
         catagoryName:catName,
         iconName:iconName
       });
       
       const result = await cat.save();
       if(result){
         res.send(result);
         console.log(result)
       }
       else{
         res.send("error")
       }
     
  
  },
  getAllCat : async (req,res) => {
    const allCat = await Catagory.find();
    allCat ? res.send(allCat): res.send("no catagory found");
  },
  getByCat: async (req,res) => {

    const catagoryName = req.body.catName;
        const allCat = await Catagory.find({catagoryName:catagoryName});
        res.send(allCat)
   // const allCat = await Catagory.find();
  } ,
}

//catagoryName