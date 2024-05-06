const Reviews = require("./reviewSchema.js");

module.exports={
  getReview : async (req,res) => {
    const  productId = req.body.id;
   const result = await Reviews.find({"productId":productId}).sort({createdAt:-1});
    console.log(result);
    if(result.length > 0){
    res.send(result);
    }
  },
  add: async (req,res) => {
  const {postId,user_id,userName,reviewTxt,rating,submitAt} = req.body.reviewData;
  if(postId == "" || user_id == "" || userName== "" || reviewTxt == "" || rating == "" || submitAt == ""){
    console.log("all feilds must required")
  }
  else{
    
    const newReview = new Reviews({
      productId:postId,
      userId:user_id,
      userName:userName,
      reviewText:reviewTxt,
      stars:rating,
      submitAt:submitAt
    });
    const result = await newReview.save();
    if(result){
      console.log(result);
      res.send(result)
    }
    else{
       console.log("not creted");
      res.send("review not created")
    }
  }
  
  
  
  }
}