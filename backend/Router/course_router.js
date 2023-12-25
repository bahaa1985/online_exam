import express from 'express';
import { getCourses } from '../controller/course_controller.js';

const course_router=express.Router();

course_router.get('/',async (req,res)=>{
 getCourses(1).then((result)=>{
    res.status(200).json(result);
 })
 .catch((err)=>{
    res.status(400).json(err);
 })
});

export default course_router;