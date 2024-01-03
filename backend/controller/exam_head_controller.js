import Sql from 'mssql'
import poolPromise from "./sql_connect_api.js";

const pool=await poolPromise;
export async function getExams( ){    
    const result= await pool.request.query('SELECT * FROM Exam');
    const exams= result.recordset;
    return exams;
}

export async function getExam(exam_id){
    const result=await pool.request.query(`SELECT * FROM Exam WHERE id=${exam_id}`);
    const exam=result.recordset;
    return exam;
}

export async function createExam(admin_id,course_id,exam_date,start_time,end_time){
    const exam_request=new Sql.Request();
    exam_request.input('admin_id',Sql.Int,'');
    exam_request.input('course_id',Sql.Int,'');
    exam_request.input('exam_date',Sql.Date,'');
    exam_request.input('start_time',Sql.Time,'');
    exam_request.input('end_time',Sql.Time,'');
    exam_request.execute('CREATE_NEW_EXAM');
}

export async function updateExam(exam_id,admin_id,course_id,exam_date,start_time,end_time){
    const exam_request=new Sql.Request();
    exam_request.input('exam_id',Sql.Int,'');
    exam_request.input('admin_id',Sql.Int,'');
    exam_request.input('course_id',Sql.Int,'');
    exam_request.input('exam_date',Sql.Date,'');
    exam_request.input('start_time',Sql.Time,'');
    exam_request.input('end_time',Sql.Time,'');
    exam_request.execute('UPDATE_EXAM');
}

export async function deleteExam(exam_id){
    const exam_request=new Sql.Request();
    exam_request.input('exam_id',Sql.Int,'');
    exam_request.execute('DELETE_EXAM')
}
