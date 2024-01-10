import  express  from "express";
import { getExam,getExams,createExam,updateExam} from "../Controller/exam_head_controller";
import { urlencoded } from "body-parser";

const exam_router=express.Router()

exam_router
.get('/:academic_year/:term_id',(req,res)=>{
    const academic_year=req.params.academic_year;
    const term_id=req.params.term_id;
    getExams(academic_year).then(result=>{
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
    getExam(exam_id).then(result=>{
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
    const admin_id=req.body.admin_id;
    const course_id=req.body.course_id;
    const exam_date=req.body.exam_date;
    const start_time=req.body.start_time;
    const end_time=req.body.end_time;
    const question_count=req.body.question_count;
    const exam_points=req.body.exam_points;
    
    createExam(admin_id,course_id,exam_date,start_time,end_time,question_count,exam_points)
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
.put('/:exam_id',urlencoded,(req,res)=>{
    const exam_id=req.params.exam_id;
    const course_id=req.body.course_id;
    const exam_date=req.body.exam_date;
    const start_time=req.body.start_time;
    const end_time=req.body.end_date;

    updateExam(exam_id,course_id,exam_date,start_time,end_time)
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