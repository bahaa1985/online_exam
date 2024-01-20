import poolPromise from "./sql_connect_api.js";
import Sql from 'mssql';
import { newUser } from "./user_controller.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function registerUser(user_name,user_email,user_password,user_type,user_department){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('user_name',Sql.NVarChar,user_name);
    request.input('user_email',Sql.NVarChar,user_email);
    //ensure the admin name and email are not existed:
    const result= await request.query("SELECT * FROM AppUser WHERE user_name=@user_name OR user_email=@user_email");
    
    if(result){
        // const salt=10;
        // const hashed_password=await bcrypt.hash(user_password,salt); //hashing the password
        return newUser(user_name,user_email,user_password,user_type,user_department) //imported from ./controller/user_controller
        .then(result=>{
            if(result){  //if the insertion is succees:
                console.log('user_controller result:',result);
                const new_user_id=result.recordset[0].new_user_id;
                // const secret_key=process.env.SECRET_KEY;
                // const token=jwt.sign({new_user_id,user_name,user_email,user_password},secret_key,{'expiresIn': '1h'}); //create token for the authorized new user
                return new_user_id;
            }
        })
    }
    else{
        return false;
    }
}
