import express from 'express';
import Sql from 'mssql';
import bodyParser from 'body-parser';
import { getQuestions , createQuestion , updateQuestion, deleteQuestion} from '../controller/question_controller.js';
// import { createQuestionOptions, updateQuestionOptions, deleteQuestionOptions } from '../controller/question_controller.js';

const urlEncoded=bodyParser.urlencoded({extended:false});

const question_router=express.Router();

question_router
.get('/:course_id',(req,res)=>{
    const course_id=req.params.course_id
    getQuestions(course_id).then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=>{
        res.status(500).json(err);
     })
})
.post('/',urlEncoded,async (req,res)=>{
    const questiontype_id=req.body.questiontype_id;
    const question_title=req.body.question_title;
    const course_doctor_id=req.body.course_doctor_id;
    const creation_date=req.body.creation_date;
    const options_arr=req.body.options_arr;

    await createQuestion(questiontype_id,question_title,course_doctor_id,creation_date,options_arr)
    .then(result=>{
            if(result){
                res.status(201).json({"Question":result});
            }
            else{
                res.status(400).send({'message':'Error 400: bad request!'});
            }
    })
    .catch(err=>{
        res.status(500).json(err);
    });

})
.put('/:question_id',urlEncoded,(req,res)=>{
    const question_id=req.params.question_id;
    const questiontype_id=req.body.questiontype_id;
    const question_title=req.body.question_title;
    const doctor_id=req.body.doctor_id;
    const course_id=req.body.course_id;

    updateQuestion(question_id,questiontype_id,question_title,course_id,doctor_id)
    .then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=>{
        res.status(500).json(err);
    })
})
.delete(('/:question_id'),(req,res)=>{
    const question_id=req.params.question_id;
    deleteQuestion(question_id)
    .then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=>{
        res.status(500).json(err);
    })
})

export default question_router;