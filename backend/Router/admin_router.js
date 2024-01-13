import express from 'express';
import { getAdmins } from '../Controller/user_controller.js';
import  urlencoded  from 'body-parser';

const admin_router=express.Router();

admin_router.get('/',async (req,res)=>{
 getAdmins()
 .then((result)=>{
    res.status(200).json(result);
 })
 .catch((err)=>{
    res.status(400).json(err);
 })
})

.put('/',urlencoded,(req,res)=>{
   const admin_id=req.body.admin_id;
   const admin_name=req.body.admin_name;
   const email=req.body.email;
   const password=req.body.password;

   updatedAdmin(admin_id,admin_name,email,password).then((result)=>{
      if(result){
         res.status(201).json(result);
     }
     else{
         res.status(400).send('Error 400: bad request!');
     }     
   })
   .catch((err)=>{
      res.status(500).send(err);
   })
})

export default admin_router;