import express from 'express';
import { login } from '../Controller/login_controller.js';
import bodyParser from 'body-parser';
const urlencoded=bodyParser.urlencoded({extended:false});

const login_router=express.Router();

login_router.post('/',urlencoded,(req,res)=>{
    const email=req.body.user_email;
    const password=req.body.user_password;
    login(email,password).then(result=>{
    if(result){
        res.status(201).json(result);
    }
    else{
        res.status(400).send('Error 400: تأكد من الايميل و كلمة المرور!');
    }
    })
    .catch(err=> res.status(500).json(err));
})

export default login_router;