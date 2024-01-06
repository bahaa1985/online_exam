import express from 'express';
import { getExam, getExams, createExam,updateExam } from '../controller/exam_head_controller';
import { urlencoded } from 'body-parser';

const exam_head_router=express.Router();

exam_head_router.get('/',(req,res)=>{
    getExams()
    .then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=> res.status(500).json(err));
})
.get('/:exam_id',(req,res)=>{
    const exam_id=req.params.exam_id;
    getExam(exam_id)
    .then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=> res.status(500).json(err));
})
.post('/',urlencoded,(req,res)=>{
    const exam_id=req.body.exam_id;
    const student_id=req.body.student_id;
    createExam(exam_id)
    .then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=> res.status(500).json(err));
})