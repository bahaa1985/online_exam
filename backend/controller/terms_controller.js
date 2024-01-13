import poolPromise from "./sql_connect_api.js";

export async function getTerms(){
    const pool=await poolPromise;
    const request= await pool.request();
    const result= await request.execute.query('SELECT * FROM Terms');
    const terms= result.recordset;
    return terms;
}