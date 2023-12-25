import Sql from 'mssql'
import poolPromise from "./sql_connect_api.js";

export async function getQuestions(course_id){
    const pool=await poolPromise;
    const result=await pool.request().query(`SELECT * FROM Question WHERE course_id=${course_id}`)
    const questions=result.recordsets;
    return questions;
}

export async function createQuestion(questiontype_id,question_title,course_id,doctor_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('questiontype_id',Sql.Int,questiontype_id);
    request.input('question_title',Sql.NVarChar,question_title);
    request.input('course_id',Sql.Int,course_id);
    request.input('doctor_id',Sql.Int,doctor_id);

    const result=request.execute('CREATE_NEW_QUESTION');
    return result;
}