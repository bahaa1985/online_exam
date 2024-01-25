import express from 'express';
import { getTerms } from '../Controller/terms_controller.js';

const term_router=express.Router();

export default term_router.get('/',(req,res)=>{
    getTerms().then(result=>{
    if(result){
    res.status(201).json(result);
    }
    else{
    res.status(400).send('Error 400: bad request!');
    }
    })
    .catch(err=> res.status(500).json(err));
})