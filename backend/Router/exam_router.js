import  express  from "express";
import { getExams,createExam,updateExam} from "../Controller/exam_head_controller";
import { urlencoded } from "body-parser";

const exam_router=express.Router()

exam_router
.get('/:department_id/:exam_year/:term_id',(req,res)=>{
    
    const department_id=req.params.department_id;
    const exam_year=req.params.exam_year;
    const term_id=req.params.term_id;
    getExams(department_id,exam_year,term_id).then(result=>{
        if(result){
            res.status(201).json(result);
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=> res.status(500).json(err));
})
// .get('/:exam_id',(req,res)=>{
//     const exam_id=req.params.exam_id;
//     getExam(exam_id).then(result=>{
//         if(result){
//             res.status(201).json(result);
//         }
//         else{
//             res.status(400).send('Error 400: bad request!');
//         }
//     })
//     .catch(err=> res.status(500).json(err));
// })
.post('/',urlencoded,(req,res)=>{
    const admin_id=req.body.admin_id;
    const course_id=req.body.course_id;
    const exam_date=req.body.exam_date;
    const start_time=req.body.start_time;
    const end_time=req.body.end_time;
    const question_count=req.body.question_count;
    const exam_points=req.body.exam_points;
    const department_id=req.body.department_id;
    createExam(admin_id,course_id,exam_date,start_time,end_time,term_id,question_count,exam_points,department_id,)
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
    const department_id=req.body.department_id;
    const course_id=req.body.course_id;
    const exam_date=req.body.exam_date;
    const start_time=req.body.start_time;
    const end_time=req.body.end_date;
    const term_id=req.body.term_id;
    const question_count= req.body.questions_count;
    const exam_points= req.body.exam_points;
    updateExam(exam_id,department_id,course_id,exam_date,start_time,end_time,term_id,question_count,exam_points)
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