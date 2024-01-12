import poolPromise from "./sql_connect_api";
import { newUser } from "./user_controller";
import { urlencoded } from "body-parser";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function registerUser(user_name,user_email,user_password,user_type,department){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('user_name',Sql.NVarChar,user_name);
    request.input('user_email',Sql.NVarChar,user_email);
    request.input('user_password',Sql.NVarChar,user_password);
    request.input('user_type',Sql.NVarChar,user_type);
    request.input('department',Sql.NVarChar,department);
    //ensure the admin name and email are not existed:
    const result= await request.execute.query(`SELECT * FROM AppUser WHERE user_name=${user_name} OR user_email=${user_email}`);
    if(!result){
        const salt=10;
        const hashed_password=await bcrypt.hash(password,salt); //hashing the password
        newUser(user_name,user_email,hashed_password,user_type,department)
        .then(result=>{
            if(result){  //if the insertion is succees:
                const new_user_id=result.recordset[0][0].new_user_id;
                const secret_key=process.env.SECRET_KEY;
                const token=jwt.sign({new_user_id,user_name,user_email,user_password},secret_key,{'expiresIn': '1h'}); //create token for the autorized new admin
                result.json(token);
            }
            else{

            }
        })
    }
}
