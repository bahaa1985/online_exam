import express from 'express';
import { getDoctors, updateDoctor, newDoctor} from '../Controller/doctor_controller.js';
import  urlencoded  from 'body-parser';

const doctor_router=express.Router();

doctor_router.get('/',async (req,res)=>{
 getDoctors().then((result)=>{
    res.status(200).json(result);
 })
 .catch((err)=>{
    res.status(400).json(err);
 })
})
.post('/new_doctor',urlencoded,(req,res)=>{
   const doctor_name=req.body.doctor_name;
   const doctor_email=req.body.doctor_email;
   const doctor_password=req.body.doctor_password;

   newDoctor(doctor_name,doctor_email,doctor_password).then((result)=>{
      res.status(200).json(result);
   })
   .catch((err)=>res.status(500).json(err));
})
.patch('/:doctor_id',urlencoded,(req,res)=>{
   const doctor_id=req.params.doctor_id;
   const doctor_name=req.body.doctor_name;
   const doctor_email=req.body.doctor_email;
   const doctor_password=req.body.doctor_password;

   updateDoctor(doctor_id,doctor_name,doctor_email,doctor_password).then((result)=>{
      res.status(200).json(result);
   })
   .catch((err)=>res.status(500).json(err));
})

export default doctor_router;