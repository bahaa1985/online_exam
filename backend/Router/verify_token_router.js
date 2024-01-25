import express from 'express';
import jwt from 'jsonwebtoken';


function authenticateToken(req,res,next){
    const token=req.cookies.token;
    // console.log("local storage",localStorage.getItem("auth-token"));
    const secret_key=process.env.SECRET_KEY;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
   
    jwt.verify(token,secret_key,(err,user)=>{
        console.log("user:",user);
        if(err) return err.message;
        req.user=user;
       
    })
    next();
}

const verify_token_router=express.Router();

verify_token_router.get('/',authenticateToken,(req,res)=>{
    res.json({ message:"user is verified", user: req.user });
})

export default verify_token_router;