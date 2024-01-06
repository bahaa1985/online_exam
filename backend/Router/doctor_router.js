import express from 'express';
import { getDoctors, updateDoctor, newDoctor, deleteDoctorCourse} from '../controller/doctor_controller.js';
import  urlencoded  from 'body-parser';

const doctor_router=express.Router();

doctor_router.get('/',async (req,res)=>{
 getDoctors().then(result=>{
   if(result){
      res.status(201).json(result);
  }
  else{
      res.status(400).send('Error 400: bad request!');
  }
 })
 .catch(err=>{
    res.status(400).json(err);
 })
})
.post('/new_doctor',urlencoded,(req,res)=>{
   const doctor_name=req.body.doctor_name;
   const doctor_email=req.body.doctor_email;
   const doctor_password=req.body.doctor_password;
   const courses_array=req.body.courses_array
   newDoctor(doctor_name,doctor_email,doctor_password,courses_array).then(result=>{
      if(result){
         res.status(201).json(result);
     }
     else{
         res.status(400).send('Error 400: bad request!');
     }
   })
   .catch(err=>res.status(500).json(err));
})
.put('/:doctor_id',urlencoded,(req,res)=>{
   const doctor_id=req.params.doctor_id;
   const doctor_name=req.body.doctor_name;
   const doctor_email=req.body.doctor_email;
   const doctor_password=req.body.doctor_password;

   updateDoctor(doctor_id,doctor_name,doctor_email,doctor_password).then(result=>{
      if(result){
         res.status(201).json(result);
     }
     else{
         res.status(400).send('Error 400: bad request!');
     }
   })
   .catch(err=>res.status(500).json(err));
})
.delete('/:doctor_course_id',urlencoded,(req,res)=>{
   
   const doctor_course_id=req.params.doctor_course_id;

   deleteDoctorCourse(doctor_course_id).then(result=>{
      if(result){
         res.status(201).json(result);
     }
     else{
         res.status(400).send('Error 400: bad request!');
     }
   })
   .catch(err=>res.status(500).json(err));
})

export default doctor_router;