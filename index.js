const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
 mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true })
     .then(() => console.log('connected'))
     .catch( (error) => error);
  
  app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(process.env.PORT,() => {
  console.log("connected");
  
  module.exports = app;
})