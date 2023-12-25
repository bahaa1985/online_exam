import poolPromise from "./sql_connect_api.js";

export async function getDoctors(){
    const pool=await poolPromise;
    const result = await pool.request().query('SELECT * FROM Doctor');
    const doctors=result.recordsets;
    return doctors;
}