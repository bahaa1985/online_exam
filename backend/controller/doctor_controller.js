import poolPromise from "./sql_connect_api.js";
import Sql from 'mssql';

export async function getDoctors(){
    const pool=await poolPromise;
    const result = await pool.request().query('SELECT * FROM Doctor');
    const doctors=result.recordset;
    return doctors;
}

export async function newDoctor(doctor_name,doctor_email,doctor_password,courses_array){
    const pool=await poolPromise;
    const transaction=Sql.Transaction(pool);
    const request= new Sql.Request(transaction);
    await transaction.begin()
    .then(()=>{
        request.input('doctor_name',Sql.NVarChar,doctor_name);
        request.input('doctor_email',Sql.NVarChar,doctor_email);
        request.input('doctor_password',Sql.NVarChar,doctor_password);
        const new_doctor_id=0;
        request.execute('CREATE_NEW_DOCTOR')
        .then((result)=>{
            if(result.rowsAffected>0){
                new_doctor_id=result.recordset[0][0].new_doctor_id;
                for(let i=0;i<courses_array.length;i++){
                    request.parameters.clear();
                    request.input('doctor_id',Sql.Int,new_doctor_id);
                    request.input('course_id',Sql.Int,courses_array[i].course_id);
                    request.input('academic_year',Sql.NChar,courses_array[i].academic_year);                    
                }
                transaction.commit();               
                return result;              
            }
        })
        .catch((err)=>{
            transaction.rollBack();
            return err;
        })    
    })
    .catch((err)=>{
        transaction.rollBack();
        return err;
    })
    
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