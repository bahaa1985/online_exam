import express from 'express';
import { getStudentAnswers, createStudentAnswer } from '../Controller/student_answers_controller';
import { urlencoded } from 'body-parser';

const student_answers_router=express.Router();

student_answers_router
.get('/:exam_id/student_id',(req,res)=>{
const exam_id=req.params.exam_id;
const student_id=req.params.student_id;
getStudentAnswers(exam_id,student_id)
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
    createStudentAnswer(exam_id,student_id)
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
