import express from 'express'
import { getExamQuestions, createExamQuestion, deleteExamQuestion } from '../controller/exam_question_controller';
import { urlencoded } from 'body-parser';

const exam_questions_router=express.Router();

exam_questions_router
.get('/:exam_id',(req,res)=>{
    const exam_id=req.params.exam_id;
    getExamQuestions(exam_id).then(result=>{
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
    const question_id =req.body.question_id;

    createExamQuestion(exam_id,question_id).then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=>res.status(500).json(err));
})
.delete('/:exam_question_id',(req,res)=>{
    const exam_question_id=req.params.exam_question_id;
    deleteExamQuestion(exam_question_id).then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: Bad request! ')
        }
    })
    .catch(err=> res.status(500).json(err));
})
