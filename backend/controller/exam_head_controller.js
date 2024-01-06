import Sql from 'mssql'
import poolPromise from "./sql_connect_api.js";

const pool=await poolPromise;
export async function getExams(academic_year){    
    const result= await pool.request.query(`SELECT * FROM Exam WHERE YEAR(exam_date)=${academic_year}`);
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
    exam_request.input('admin_id',Sql.Int,admin_id);
    exam_request.input('course_id',Sql.Int,course_id);
    exam_request.input('exam_date',Sql.Date,exam_date);
    exam_request.input('start_time',Sql.Time,start_time);
    exam_request.input('end_time',Sql.Time,end_time);
    exam_request.execute('CREATE_NEW_EXAM');
}

export async function updateExam(exam_id,course_id,exam_date,start_time,end_time){
    const exam_request=new Sql.Request();
    exam_request.input('exam_id',Sql.Int,exam_id);
    exam_request.input('course_id',Sql.Int,course_id);
    exam_request.input('exam_date',Sql.Date,exam_date);
    exam_request.input('start_time',Sql.Time,start_time);
    exam_request.input('end_time',Sql.Time,end_time);
    exam_request.execute('UPDATE_EXAM');
}

export async function deleteExam(exam_id){
    const exam_request=new Sql.Request();
    exam_request.input('exam_id',Sql.Int,exam_id);
    exam_request.execute('DELETE_EXAM')
}
