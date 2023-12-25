import express from 'express';
import { getAdmins } from '../controller/admin_controller.js';

const admin_router=express.Router();

admin_router.get('/',async (req,res)=>{
 getAdmins()
 .then((result)=>{
    res.status(200).json(result);
 })
 .catch((err)=>{
    res.status(400).json(err);
 })
});

export default admin_router;