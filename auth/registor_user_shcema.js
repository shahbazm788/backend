
const mongoose = require("mongoose");
//const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
require("dotenv").config();


const userSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Email already Exist forget pasword?"],

    },
    password:{
        type: String,
        min:8,

    },
    phone:{
        type: Number,
        min: 11,
        // required:true,
    },
    address:{
        type:String,
    },
    login:{
      type:Boolean,
      default:false
    },
    tokens:[{
        token:{
         type:String,

        }
    }]
});

// userSchema.methods.genreatToken = async function(next) {
//     try {
//         const token = await jwt.sign({_id:this._id},process.env.SECRET_KEY);
//         this.tokens =  this.tokens.concat({token:token});
//         return frontUserToken;
        
//     } catch (e) {
//         console.error('Error', e)
//     }
 
// }
userSchema.methods.genrateToken = async function(next){
    try {
        const token =  jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        return token;
    } catch (err) {
        
    }
}
// userSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password,10);
//     }
//     next();
// });

const Addusers =  mongoose.model("Addusers",userSchema);
// const RegistedUser = mongoose.model("RegistedUser",userRegistorSchema);


module.exports = Addusers;