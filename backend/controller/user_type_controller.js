import poolPromise from "./sql_connect_api.js";

export async function getUserTypes(){
    const pool=await poolPromise;
    const request= await pool.request();
    const result= await request.query("SELECT * FROM UserType");
    const types= result.recordset;
    return types;
}