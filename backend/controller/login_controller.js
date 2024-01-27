import Sql from 'mssql';
import poolPromise from './sql_connect_api.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

 export async function login(email,password){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('email',Sql.NVarChar,email);
    request.input('password',Sql.NVarChar,password);
    const user=await request.query("SELECT * FROM AppUser WHERE user_email=@email AND  user_password=@password");
    if(user.recordset.length>0){
        const secret_key=process.env.SECRET_KEY;
        const token=jwt.sign({user_id:user.recordset[0].id,
        user_name:user.recordset[0].user_name,
        user_email:user.recordset[0].user_email,
        user_type:user.recordset[0].user_type_id,
        user_department:user.recordset[0].department,
        user_status:user.recordset[0].user_status_id},
        secret_key,{expiresIn:'3h'}); 
        return token;
    }
   
}