import express from 'express';
import jwt from 'jsonwebtoken';

const logout_router=express.Router();

logout_router.post('/',(req,res)=>{
    res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json("تم تسجيل الخروج بنجاح!");
})

export default logout_router;