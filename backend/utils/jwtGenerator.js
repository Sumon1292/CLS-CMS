const jwt=require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id,email){
    const payload={
        user_id:id,
        user_email:email
    }

    return jwt.sign(payload,process.env.JWTSECRET,{expiresIn:"1hr"});
}

module.exports=jwtGenerator