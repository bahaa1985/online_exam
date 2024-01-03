import poolPromise from "./sql_connect_api.js";

export async function getCourses(doctor_id){
    const pool=await poolPromise;
    const result=await pool.request().input('doctor_id',doctor_id).execute('GET_DOCTOR_COURSES')
    const courses=result.recordset;
    return courses;
}