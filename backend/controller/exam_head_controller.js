import Sql from 'mssql'
import poolPromise from './sql_connect_api.js';

const pool = await poolPromise;

export async function getExamsForDoctors(course_doctor_id,academic_year,term_id){ 
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('course_doctor_id',Sql.Int,course_doctor_id);
    request.input('academic_year',Sql.Int,academic_year);
    request.input('term_id',Sql.Int,term_id);
    const result= await request.query('SELECT * FROM Exam WHERE YEAR(exam_date)=@academic_year AND term_id=@term_id AND course_doctor_id=@course_doctor_id');
    return result.recordsets[0][0];   
}

export async function getExams(department_id, exam_year, term_id) {
    const pool = await poolPromise;
    const request = await pool.request();
    request.input('department_id', Sql.Int, department_id);
    request.input('exam_year', Sql.Int, exam_year);
    request.input('term_id', Sql.Int, term_id);
    const result = await request.execute('SELECT_EXAM');
    const exams = result.recordset;
    return exams;
}

export async function createExam(admin_id, department_id, course_doctor_id, exam_date, start_time, end_time,exam_year, term_id, question_count, exam_points) {
    const pool = await poolPromise;
    const exam_find = pool.request();

    exam_find.input('exam_year', Sql.Int, exam_year);
    exam_find.input('term_id', Sql.Int, term_id);
    exam_find.input('course_doctor_id', Sql.Int, course_doctor_id);
    const exam = await exam_find.execute('GET_EXAM');

    if (exam.recordset.length < 1) {
        const exam_request = pool.request();
        exam_request.input('department_id', Sql.Int, department_id);
        exam_request.input('admin_id', Sql.Int, admin_id);
        exam_request.input('course_doctor_id', Sql.Int, course_doctor_id);
        exam_request.input('exam_date', Sql.Date, exam_date);
        exam_request.input('exam_start', Sql.NVarChar, start_time);
        exam_request.input('exam_end', Sql.NVarChar, end_time);
        exam_request.input('term_id', Sql.Int, term_id);
        exam_request.input('questions_count', Sql.Int, question_count);
        exam_request.input('exam_points', Sql.Int, exam_points);
        const new_exam = exam_request.execute('CREATE_NEW_EXAM');
        return new_exam;
    }
    else {
        return false;
    }
}

export async function updateExam(exam_id, department_id, course_id, exam_date, start_time, end_time, term_id, question_count, exam_points) {
    const exam_request = new Sql.Request();
    exam_request.input('exam_id', Sql.Int, exam_id);
    exam_request.input('department_id', Sql.Int, department_id);
    exam_request.input('course_id', Sql.Int, course_id);
    exam_request.input('exam_date', Sql.Date, exam_date);
    exam_request.input('start_time', Sql.Time, start_time);
    exam_request.input('end_time', Sql.Time, end_time);
    exam_request.input('term_id', Sql.Int, term_id);
    exam_request.input('question_count', Sql.Int, question_count);
    exam_request.input('exam_points', Sql.Int, exam_points);
    exam_request.execute('UPDATE_EXAM');
}

// export async function deleteExam(exam_id){
//     const exam_request=new Sql.Request();
//     exam_request.input('exam_id',Sql.Int,exam_id);
//     exam_request.execute('DELETE_EXAM')
// }
