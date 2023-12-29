import poolPromise from "./sql_connect_api.js";
import Sql from 'mssql';

export async function getDoctors(){
    const pool=await poolPromise;
    const result = await pool.request().query('SELECT * FROM Doctor');
    const doctors=result.recordsets;
    return doctors;
}

export async function newDoctor(doctor_name,doctor_email,doctor_password){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('@doctor_name',Sql.NVarChar,doctor_name);
    request.input('@doctor_email',Sql.NVarChar,doctor_email);
    request.input('@doctor_password',Sql.NVarChar,doctor_password);
    const result= request.execute('CREATE_NEW_DOCTOR');
    return result;
}

export async function updateDoctor(doctor_id,doctor_name,doctor_email,doctor_password){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('@doctor_id',Sql.Int,doctor_id);
    request.input('@doctor_name',Sql.NVarChar,doctor_name);
    request.input('@doctor_email',Sql.NVarChar,doctor_email);
    request.input('@doctor_password',Sql.NVarChar,doctor_password);
    const result= request.execute('UPDATE_DOCTOR');
    return result;
}