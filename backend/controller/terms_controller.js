import poolPromise from "./sql_connect_api.js";

export async function getTerms(){
    const pool=await poolPromise;
    const request= await pool.request();
    const result= await request.query('SELECT * FROM Term');
    const terms= result.recordset;
    return terms;
}