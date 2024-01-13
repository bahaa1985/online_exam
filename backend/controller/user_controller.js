import poolPromise from "./sql_connect_api.js"


export async function getAdmins(){
    const pool=await poolPromise;
    const result = await pool.request().query('SELECT * FROM AppUser WHERE user_type=1');
    const admins=result.recordsets;
    return admins;
}

export async function getDoctors(){
    const pool=await poolPromise;
    const result = await pool.request().query('SELECT * FROM AppUser WHERE user_type=2');
    const doctors=result.recordsets;
    return doctors;
}

export async function newUser(user_name, user_email,user_password,user_type,department_id=null){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('user_name',Sql.NVarChar,user_name);
    request.input('user_email',Sql.NVarChar,user_email);
    request.input('user_password',Sql.NVarChar,user_password);
    request.input('user_type',Sql.NVarChar,user_type);
    request.input('department_id',Sql.Int,null);    
    const new_user= await request.execute("CREATE_NEW_USER");
    return new_user.recordset;
}

export async function updateUser(user_id,user_name, user_email,user_password,user_type,department_id=null){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('id',Sql.Int,user_id);
    request.input('user_name',Sql.NVarChar,user_name);
    request.input('user_email',Sql.NVarChar,user_email);
    request.input('user_password',Sql.NVarChar,user_password);
    request.input('user_type',Sql.NVarChar,user_type);
    if(user_type===1){
        request.input('department_id',Sql.NVarChar,null);
    }
    else{
        request.input('department_id',Sql.NVarChar,department_id);
    }
    const user= await request.execute("UPDATE_USER");
    return user.recordset;
}

export async function suspendUser(user_id){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('id',Sql.Int,user_id);
    const user= await request.execute("SUSPEND_USER");
    return user.recordset;
}


