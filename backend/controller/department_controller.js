import poolPromise from "./sql_connect_api.js";

export async function getDepartments(){
    const pool=await poolPromise;
    const request= await pool.request();
    const result= await request.query("SELECT * FROM Department");
    const departments=result.recordset;
    return departments;
}