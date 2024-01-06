import express from 'express';
import { getCourses } from '../controller/course_controller.js';
// import { urlencoded } from 'body-parser';

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
});

export default course_router;