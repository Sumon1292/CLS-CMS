const router = require('express').Router()
const PlaceOrder = require('../models/PlaceOrder.model')
const dotenv = require('dotenv')
const authorize=require("../middleware/authorize");
const mongoose=require("mongoose");
dotenv.config()

const uri="mongodb+srv://mohikush:kush12345@cluster0.uih2paa.mongodb.net/cls?retryWrites=true&w=majority"
mongoose.connect(uri);

router.get('/checkstatus',authorize, async(req,res) => {
  console.log(req.user);
  try{
    const orders=await PlaceOrder.find({user_id:req.user.user_id});
    res.json(orders);
   }catch(err){
       res.status(400).json(err)
   }
});

router.post('/track',async(req,res)=>{
  console.log("inside trackorder");
  const orderdetail=req.body;
  try{
      console.log(orderdetail.ID);
      const order=await PlaceOrder.findOne({_id:orderdetail.ID});
      console.log(order);
      res.json(order);
   }catch(err){
       res.status(400).json(err)
   }
})

module.exports = router