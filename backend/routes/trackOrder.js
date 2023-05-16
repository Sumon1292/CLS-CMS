const router = require('express').Router()
const PlaceOrder = require('../models/PlaceOrder.model')
const dotenv = require('dotenv')
const mongoose=require("mongoose");
dotenv.config()

const uri="mongodb+srv://mohikush:kush12345@cluster0.uih2paa.mongodb.net/cls?retryWrites=true&w=majority";
mongoose.connect(uri);

router.post('/track',async(req,res) => {
    console.log("inside trackorder");
  const {trackId}=req.body;
  try{
      console.log(trackId);
      const order=await PlaceOrder.find({_id:trackId});
      res.json(order);
   }catch(err){
       res.status(400).json(err)
   }
});

module.exports = router