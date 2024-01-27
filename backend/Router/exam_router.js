import  express  from "express";
import { getExams,createExam,updateExam,getExamsForDoctors} from "../Controller/exam_head_controller.js";
import bodyParser from "body-parser";
const urlencoded=bodyParser.urlencoded({extended:false});

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
.get('/',(req,res)=>{
    const academic_year=req.query.academic_year;
    const term_id=req.query.term_id;
    const course_doctor_id=req.query.course_doctor_id;

    getExamsForDoctors(course_doctor_id,academic_year,term_id).then(result=>{
        if(result){
            res.status(201).json({"exam":result});
        }
        else{
            res.status(400).send('Error 400: bad request!');
        }
    })
    .catch(err=> res.status(500).json(err));
})
.post('/',urlencoded,(req,res)=>{
    const exam_year=req.body.exam_year;
    const term_id=req.body.term_id;
    const admin_id=req.body.admin_id;
    const department_id=req.body.department_id;
    const course_doctor_id=req.body.course_doctor_id;
    const exam_date=req.body.exam_date;
    const exam_start=req.body.exam_start;
    const exam_end=req.body.exam_end;
    const question_count=req.body.questions_count;
    const exam_points=req.body.exam_points;
    console.log("exam body:",req.body)
    createExam(admin_id,department_id,course_doctor_id,exam_date,exam_start,exam_end,exam_year,term_id,question_count,exam_points)
    .then(exam=>{
        if(exam){
            res.status(201).json({"result":exam,"message":"تم إنشاء امتحان جديد بنجاح!"});
        }
        else{
            res.status(400).json({"message":'Error 400: bad request!'});
        }
    })
    .catch(err=> res.status(500).json({"message":err.message}));
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

export default exam_router;