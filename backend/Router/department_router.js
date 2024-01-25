import express from 'express';
import bodyParser from 'body-parser';
import { getDepartments } from '../Controller/department_controller.js';

const urlEncoded=bodyParser.urlencoded({extended:false});
const department_router=express.Router();

export default department_router.get('/',(req,res)=>{
    getDepartments().then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send("Error 400: bad request!");
        }
    })
    .catch(err=>{res.status(500).json(err.message)});
})