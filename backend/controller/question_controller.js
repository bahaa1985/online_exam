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

export async function updateQuestion(question_id,questiontype_id,question_title,course_id,doctor_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('question_id',Sql.Int,question_id);
    request.input('questiontype_id',Sql.Int,questiontype_id);
    request.input('question_title',Sql.NVarChar,question_title);
    request.input('course_id',Sql.Int,course_id);
    request.input('doctor_id',Sql.Int,doctor_id);

    const result=request.execute('UPDATE_QUESTION');
    return result;
}

export async function deleteQuestion(question_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('question_id',Sql.Int,question_id);
    const result=request.execute('DELETE_QUESTION');
    return result;
}

export async function createQuestionOptions(question_id,question_option,option_status){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('question_id',Sql.Int,question_id);
    request.input('question_option',Sql.NVarChar,question_option);
    request.input('option_status',Sql.Bit,option_status);
    const result=request.execute('CREATE_QUESTION_OPTIONS');
    return result;
}

export async function updateQuestionOptions(option_id,question_option,option_status){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('option_id',Sql.Int,option_id);
    request.input('question_option',Sql.NVarChar,question_option);
    request.input('option_status',Sql.Bit,option_status);
    const result=request.execute('UPDATE_QUESTION_OPTIONS');
    return result;
}

export async function deleteQuestionOptions(option_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('option_id',Sql.Int,option_id);
    const result=request.execute('DELETE_QUESTION_OPTIONS');
    return result;
}