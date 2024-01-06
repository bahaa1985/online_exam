import Sql from 'mssql';
import poolPromise from './sql_connect_api';

export async function getExamStudents(exam_id){
    const pool=await poolPromise;
    const request=pool.request();
    request.input('exam_id',Sql.Int,exam_id)
    const exam_students=await request.execute('SELECT_EXAM_STUDENTS');
    return exam_students;
}

export async function createExamStudents(exam_id,student_id){
    const pool=await poolPromise;
    const request=pool.request();
    request.input('exam_id',Sql.Int,exam_id)
    request.input('student_id',Sql.Int,student_id);
    const new_exam_student=await request.execute('CREATE_EXAM_STUDENT');
    return new_exam_student
}

export async function deleteExamStudents(exam_student_id){
    const pool=await poolPromise;
    const request=pool.request();
    request.input('exam_student_id',Sql.Int,exam_student_id)
    const new_exam_student=await request.execute('DELETE_EXAM_STUDENT');
    return new_exam_student
}
