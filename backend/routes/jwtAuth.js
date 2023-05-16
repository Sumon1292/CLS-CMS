const bcrypt=require("bcryptjs");
const express=require("express");
const bodyParser=require("body-parser");
const jwtGenerator=require("../utils/jwtGenerator");
const mongoose=require("mongoose");
const validInfo=require("../middleware/validinfo");
const authorize=require("../middleware/authorize");
const { response } = require("express");
const router=express.Router();
const User = require('../models/User.model');
const Otp = require("../models/Otp.model");


//nst OldToken = require("../models/OldToken.model");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_ADDRESS,

      pass: process.env.EMAIL_PASSWORD,
    },
  });



const uri="mongodb+srv://mohikush:kush12345@cluster0.uih2paa.mongodb.net/cls?retryWrites=true&w=majority";
mongoose.connect(uri);



router.use(express.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));

const saltRounds=10;


router.post("/register",validInfo,async function(req,res){
    try{
        //1. destructure the req.body
        console.log("inside registration");
        const {firstname,lastname,email,contact,password}=req.body;

        const user=await User.find({user_email:email});

        if(user.length!==0){
            return res.status(401).send("User already exists"); //unauthorized access
        }

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err){
                    throw err
                }else{
                    const validUser = new User({
                        user_firstname: firstname,
                        user_lastname: lastname,
                        user_contact: contact,
                        user_email: email,
                        user_password:hash
                      });

                    validUser.save()

                    const token=jwtGenerator(validUser._id,validUser.user_email);

                    validUser.token=token;
                    res.status(201).json(validUser);

                }
            });
        });




    } catch(err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});


//login route

router.post("/login",validInfo,async function(req,res){
    try{
        console.log("inside login");
        const {email,password}=req.body;
        console.log(email);
        console.log(password);

        const user=await User.findOne({user_email:email});

        if(user===null){
            return res.status(401).send("Password or Email is incorrect"); //unauthorized access
        }
        bcrypt.compare(password, user.user_password, function(err, reshash) {
            if(err){
                throw err
            }
            else{
                const token=jwtGenerator(user._id,user.user_email);
                user.token=token;
                result={
                    'User':user,
                    'hash_res':reshash
                }
                res.status(201).json(result);
            }
        });



    }catch(err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/forgotpassword",async function(req,res){
    const { email } = req.body;
    console.log(email);

    if (!email) {
        console.log("not correct email");
      res.json(403, { message: "Enter valid mail-id" }); //res.status(400); // throw new Error("Enter email address");
    } // generate random otp

    const otp = Math.floor(100000 + Math.random() * 900000); // send email through nodemailer

    const user = await User.findOne({ user_email:email });
    console.log(user);

    if (
      user &&
      (await transporter.sendMail({
        from: "sairohittambekar@gmail.com",

        to: email,

        subject: "Password reset OTP",

        text: `Your OTP for password reset is ${otp}`,
      }))
    ) {
      const exptime = Date.now() + 600000;

      const otp_user = await Otp.create({
        email: email,

        otpcode: otp,

        otpexp: exptime,
      });

      res.json({ success: true, message: "OTP sent successfully" });
    } else {
      res.json({ success: false, message: "Enter valid Mail-id or Email not registered" }); //res.status(401); //throw new Error("Unable to send OTP.")
    }
});


router.post("/resetpassword",async function(req,res){
  const { email, password } = req.body;
console.log(req.body);
  const user_userCollection = await User.findOne({ user_email:email });
  console.log(user_userCollection);

  const user_exists = await Otp.findOne({ email });

if(!user_exists){
    return res.json( { result:false,message: "Invalid Password Reset" });
  } else {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            user_userCollection.user_password = hash;

            await user_userCollection.save();

            await user_exists.deleteOne({ email });

            return res.status(200).json({result:true, message: "Password changed successfully" });
        });
    });
  }
})

router.post("/validateotp",async function(req,res){
    const { email, otp } = req.body;

    const user_exists = await Otp.findOne({ email });
    console.log(user_exists);

    if (user_exists.otpcode == otp && user_exists.otpexp > new Date()) {
      result = { res:true,message: "OTP validated successfully" };

      res.locals.otpValidated = true;
      res.status = 200;
    } else {
      res.locals.otpValidated = false;

      res.status = 400;

      result = { res:false,message: "OTP invalid or expired" };
    }
    return res.send(result);
  });


router.get("/",authorize,async function(req,res){
    try{
        res.json(true);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

module.exports=router;