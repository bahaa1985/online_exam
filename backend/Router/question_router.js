import express from 'express';
import bodyParser from 'body-parser';
const urlEncoded=bodyParser.urlencoded({extended:false});
import { getQuestions , createQuestion , updateQuestion, deleteQuestion} from '../controller/question_controller.js';

const question_router=express.Router();

question_router.get('/:course_id',(req,res)=>{
    const course_id=req.params.course_id
    getQuestions(course_id).then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(400).json(err);
     })
})
.post('/NewQuestion',urlEncoded,(req,res)=>{
    const questiontype_id=req.body.questiontype_id;
    const question_title=req.body.question_title;
    const doctor_id=req.body.doctor_id;
    const course_id=req.body.course_id;

    console.log("Body:",req.body)
    createQuestion(questiontype_id,question_title,course_id,doctor_id).then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>console.log(err));

})
.patch('/:question_id',urlEncoded,(req,res)=>{
    const question_id=req.params.question_id;
    const questiontype_id=req.body.questiontype_id;
    const question_title=req.body.question_title;
    const doctor_id=req.body.doctor_id;
    const course_id=req.body.course_id;

    updateQuestion(question_id,questiontype_id,question_title,course_id,doctor_id)
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})
.delete(('/:question_id'),(req,res)=>{
    const question_id=req.params.question_id;
    deleteQuestion(question_id)
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

export default question_router;