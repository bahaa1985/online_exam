import poolPromise from "./sql_connect_api.js";
import Sql from 'mssql';

export async function getDoctorCourses(doctor_id){
    const pool=await poolPromise;
    const result=await pool.request().input('doctor_id',doctor_id).execute('GET_DOCTOR_COURSES')
    const courses=result.recordset;
    return courses;
}

export async function getCoursesForExam(department_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('department_id',Sql.Int,department_id);
    const result= await request.execute("GET_COURSES_FOR_EXAM");
    const courses=result.recordset;
    return courses;
}

export async function getDepartmentCourses(department_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('department_id',Sql.Int,department_id);
    const result= await request.query(`SELECT * FROM Course WHERE department_id=@department_id`);
    const courses=result.recordset;
    return courses;
}

export async function newCourse(course_name,course_code,department_id){
    const pool=await poolPromise;
    const request= await pool.request();    
    request.input('course_name',Sql.NVarChar,course_name);
    request.input('course_code',Sql.NVarChar,course_code);
    request.input('department_id',Sql.NVarChar,department_id);
    const result= await request.execute.query(`INSERT INTO Course VALUES (${course_name,course_code,department_id})`);
    return result;
}