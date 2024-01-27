import express from 'express';
import Sql from 'mssql';
import bodyParser from 'body-parser';
import { getQuestionTypes } from '../Controller/question_type_controller.js';

const question_type_router=express.Router();

question_type_router.get('/',(req,res)=>{
    getQuestionTypes().then(types=>{
        if(types){
            res.status(200).json({"result":types});
        }
        else{
            res.status(400).json({"message":"Error 400: bad request!"});
        }
    })
    .catch(err=>{
        res.status(500).json({"QUestion type  error message":err.message});
    })
})

export default question_type_router;
