import express from 'express';
import { getDoctors } from '../controller/doctor_controller.js';

const doctor_router=express.Router();

doctor_router.get('/',async (req,res)=>{
 getDoctors().then((result)=>{
    res.status(200).json(result);
 })
 .catch((err)=>{
    res.status(400).json(err);
 })
});

export default doctor_router;