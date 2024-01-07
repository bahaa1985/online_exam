import Sql from 'mssql';
import poolPromise from './sql_connect_api';

export async function getStudentAnswers(exam_student_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('exam_id',Sql.Int,exam_student_id);
    const result= await request.execute(stored_procedure);
    return result.recordset;
}