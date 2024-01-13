import express from 'express';
import { getCourses, newCourse } from '../controller/course_controller.js';
import bodyParser from 'body-parser';
const urlencoded=bodyParser.urlencoded({extended:false});
const course_router=express.Router();

course_router.get('/:doctor_id',async (req,res)=>{
   const doctor_id=req.params.doctor_id
   getCourses(doctor_id).then(result=>{
      if(result){
         res.status(201).json(result);
      }
      else{
         res.status(400).send('Error 400: bad request!');
      }
   })
   .catch((err)=>{
      res.status(400).json(err);
   })
})
.post('/',urlencoded,(req,res)=>{
   const course_name=req.body.course_name;
   const course_code=req.body.course_code;
   const department_id=req.body.department_id;
   newCourse(course_name,course_code,department_id).then(result=>{
      if(result){
         res.status(201).json(result);
      }
      else{
         res.status(400).send('Error 400: bad request!');
      }
   })
   .catch((err)=>{
      res.status(400).json(err);
   })
})

export default course_router;