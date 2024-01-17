import express from 'express';
import { getUserTypes } from '../Controller/user_type_controller.js';

const user_type_router=express.Router();

export default user_type_router.get('/',(req,res)=>{
    getUserTypes().then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=> res.status(500).json(err));
})