import Sql from 'mssql';
import poolPromise from './sql_connect_api.js';

export async function getExamQuestions(exam_id){
    const pool= await poolPromise;
    const request=pool.request();
    request.input('@exam_id',Sql.Int,exam_id);
    const result=await request.query('SELECT * FROM ExamQuestions WHERE exam_id=@exam_id');
    return result.recordset;
}

export async function createExamQuestion(exam_id,question_id){
    const pool= await poolPromise;
    const request=pool.request();
    request.input('@exam_id',Sql.Int,exam_id);
    request.input('@question_id',Sql.Int,question_id);
    const new_exam_question= await request.execute('CREATE_EXAM_QUESTION');
    return new_exam_question;
}

export async function deleteExamQuestion(exam_question_id){
    const pool= await poolPromise;
    const request=pool.request();
    request.input('@exam_question_id',Sql.Int,exam_id);    
    const deleted_exam_question= await request.execute('DELETE_EXAM_QUESTION');
    return deleteExamQuestion;
}