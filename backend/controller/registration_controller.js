import poolPromise from "./sql_connect_api.js";
import Sql from 'mssql';
import { newUser } from "./user_controller.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function registerUser(user_name,user_email,user_password,user_type,user_department,course_id,academic_year){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('user_name',Sql.NVarChar,user_name);
    request.input('user_email',Sql.NVarChar,user_email);
    //ensure the admin name and email are not existed:
    const result= await request.query("SELECT * FROM AppUser WHERE user_name=@user_name OR user_email=@user_email");
    
    if(result.recordset.length<1){
        return await newUser(user_name,user_email,user_password,user_type,user_department,course_id,academic_year) //imported from ./controller/user_controller
        .then(user=>{
            if(user){  //if the insertion is succees:
                console.log('user_controller result: true',user);
                return user;
            }
            else{
                console.log('user_controller result:',false);
                return false;
            }
        })
    }
    else{
        return false;
    }
}
