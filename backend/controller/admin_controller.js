import poolPromise from "./sql_connect_api.js";

export async function getAdmins(){
    const pool=await poolPromise;
    const result = await pool.request().query('SELECT * FROM Admin');
    const admins=result.recordsets;
    return admins
}


