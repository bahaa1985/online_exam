import express from "express";
import { urlencoded } from "body-parser";
import { registerUser } from "../Controller/registration_controller";
import { newUser } from "../Controller/user_controller";

const register_router=express.Router();

register_router.post('/register',urlencoded,(req,res)=>{

    const user_name=req.body.user_name;
    const user_email=req.body.user_email;
    const user_password=req.body.user_password;
    const user_type=req.body.user_type;
    const department=req.body.department;

    registerUser(user_name,user_email,user_password,user_type,department).then(result=>{
        if(result){ 
            res.status(201).json(result);
        }
        else{
            res.status(400).json('Error 400: User name or email is exist!');
        }
    })
    .catch(err=>{
        res.status(500).json(err);
    })
 })