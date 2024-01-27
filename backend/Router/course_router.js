import express from 'express';
import { getDoctorCourses, getDepartmentCourses,newCourse, getCoursesForExam } from '../Controller/course_controller.js'
import bodyParser from 'body-parser';
const urlencoded=bodyParser.urlencoded({extended:false});
const course_router=express.Router();

course_router
.get('/',async (req,res)=>{
   const doctor_id=req.query.doctor_id
   const academic_year=req.query.academic_year;

   await getDoctorCourses(doctor_id,academic_year).then(result=>{
      if(result.length>0){
         res.status(201).json({"course":result});
      }
      else{
         res.status(400).json({"message":'Error 400: bad request!'});
      }
   })
   .catch((err)=>{
      res.status(500).json({"course err message" :err.message});
   })
})
.get('/department',async (req,res)=>{
   const department_id=req.query.department_id;
   getDepartmentCourses(department_id).then(courses=>{
      if(courses){
      res.status(201).json({"data":courses,"message":'201: OK!'});
      }
      else{
      res.status(400).json({"data":courses,"message":'Error 400: bad request!'});
      }
      })
   .catch(err=> {
      res.status(500).json({"course err message" :err.message});
   })
})
.get('/term',async (req,res)=>{ // route to get courses by department and the current year
   const department_id=req.query.department_id;
   getCoursesForExam(department_id).then(courses=>{
      if(courses.length>0){
         res.status(201).json({"data":courses,"message":'201: OK!'});
      }
      else{
         res.status(400).json({"data":courses,"message":'Error 400: bad request!'});
      }
   })
   .catch(err=>{
      res.status(500).json({"course err message" :err.message})
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