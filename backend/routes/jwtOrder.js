const router = require('express').Router()
const PlaceOrder = require('../models/PlaceOrder.model')
const dotenv = require('dotenv')
const authorize=require("../middleware/authorize");
const mongoose=require("mongoose");
dotenv.config()

const uri="mongodb+srv://mohikush:kush12345@cluster0.uih2paa.mongodb.net/cls?retryWrites=true&w=majority";
mongoose.connect(uri);

router.post('/register',authorize, async(req,res) => {
  console.log(req.user);
  console.log(req.body);
  const newPlaceOrder = new PlaceOrder({
      pickup:req.body.pickup,
      drop: req.body.drop,
      weight: req.body.weight,
      typeofGood: req.body.typeofGood,
      user_id:req.user.user_id
});
  try{
    const savedPlaceOrder = await newPlaceOrder.save()
    res.status(201).json()
   }catch(err){
       res.status(400).json(err)
   }
})

module.exports = router