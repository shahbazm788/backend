
const Addusers  = require("./registor_user_shcema.js");
const jwt = require("jsonwebtoken");
// const cookies = require("cookie-parser");

module.exports= {
  regUser: async (req,res) => {
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
  },
  getUser : async (req,res) => {
    console.log("user getting");
  },
  login: async (req,res,next) => {
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
    
  }
}

//router.post("/registor",);
async function addUser  (req,res) {
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
    // console.log(req.body);
    
}
//module.exports = addUser;



/*
try {
        // fiding user by emaill
        const getData = await RegistedUser.findOne({email:email});
        //geting user id
        const _id = getData._id;
        const userPass = getData.password;

     bcrypt.compare(password,userPass, async ( err,result) => {
        if(result){
               //genrating jwt token
               const token = await  getData.genreatToken();
            
               //updating user token
               const updatetUser = await RegistedUser.findOneAndUpdate({_id},{$set:{
                   tokens: {token}
               }},{
                   new:true
               })
           
               // sending token with cookeis to browser
           res.cookie("jwt", token, {
               withCredentials: true,
               httpOnly: false,
             });
           // sending respons to clinte side
           res.json(updatetUser)
        }
        else{
            res.send('login failed')
        }
     })
       
    } catch (e) {
        console.error('Error', e)
    }*/