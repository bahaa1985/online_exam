import Sql from 'mssql';
import poolPromise from './sql_connect_api';

export async function getStudentAnswers(exam_id,student_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('exam_id',Sql.Int,exam_id);
    request.input('student_id',Sql.Int,student_id);
    const result= await request.execute("SELECT_STUDENT_ANSWER");
    return result.recordset;
}

export async function createStudentAnswer(exam_id,student_id,option_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('exam_id',Sql.Int,exam_id);
    request.input('student_id',Sql.Int,student_id);
    request.input('option_id',Sql.Int,option_id);
    const result= await request.execute("CREATE_STUDENT_ANSWER");
    return result;
}

