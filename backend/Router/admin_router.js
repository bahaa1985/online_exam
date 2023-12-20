import express from 'express';
import sql_connect from './sql_connect_api.js';
import sql from 'mssql'
// import Admin from '../model/admin_model.js';

const admin_router=express.Router();

admin_router.get('/',async (req,res)=>{
 const result= await sql.query("select * from Admin");
    console.log(res.json(result.recordsets))

});

export default admin_router;