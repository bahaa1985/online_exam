import poolPromise from "./sql_connect_api.js"

export async function getAdmins(){
    const pool=await poolPromise;
    const result = await pool.request().query('SELECT * FROM Admin');
    const admins=result.recordsets;
    return admins
}

export async function newAdmin(admin_name, email,password){
    const pool=await poolPromise;
    const new_admin =await pool.request().query(`INSERT INTO Admin VALUES (${admin_name,email,password})`);
    return new_admin;
}

export async function updatedAdmin(admin_id,admin_name, email,password){
    const pool=await poolPromise;
    const updated_admin =await pool.request().query(`UPDATE Admin SET name=${admin_name}, email=${email},password=${password} WHERE id=${admin_id}`);
    return updated_admin;
}


