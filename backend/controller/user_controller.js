import poolPromise from "./sql_connect_api.js"
import Sql from 'mssql';

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

export async function newUser(user_name, user_email,user_password,user_type,user_department,course_id,academic_year){
    const pool=await poolPromise;
    const transaction= new Sql.Transaction(pool);
    const request= new Sql.Request(transaction);
    let new_doctor_id=0;
    await transaction.begin()
    try{
        request.input('user_name',Sql.NVarChar,user_name);
        request.input('user_email',Sql.NVarChar,user_email);
        request.input('user_password',Sql.NVarChar,user_password);
        request.input('user_type',Sql.Int,user_type);
        request.input('user_department',Sql.Int,user_department);  
        const user= await request.execute("CREATE_NEW_USER")
    
        // console.log("new user:",user);
        
        if(user.rowsAffected.length>0 && user_type==2){
            new_doctor_id=user.recordset[0].new_user_id;
            if(new_doctor_id>0){
                const request2=new Sql.Request(transaction);
                request2.input('doctor_id',Sql.Int,new_doctor_id);
                request2.input('course_id',Sql.Int,course_id);
                request2.input('academic_year',Sql.NVarChar,academic_year); 
                await request2.execute('CREATE_NEW_CourseDoctor')  ;
                await transaction.commit()

                return user; 
            }
        } 
    }
    catch(error){
        transaction.rollback();
        console.log("trans error",error)
        return error.message;
    }
   finally{
        pool.close();
   }
    // .then(async ()=>{
    //     request.input('user_name',Sql.NVarChar,user_name);
    //     request.input('user_email',Sql.NVarChar,user_email);
    //     request.input('user_password',Sql.NVarChar,user_password);
    //     request.input('user_type',Sql.Int,user_type);
    //     request.input('user_department',Sql.Int,user_department);  
    //     request.execute("CREATE_NEW_USER")
    //     .then(user=>{
    //         console.log("new user:",user);
    //         if(user.rowsAffected.length>0 && user_type==2){
    //             new_doctor_id=user.recordset[0].new_user_id;
    //             if(new_doctor_id>0){
    //                 // const request2=new Sql.Request(transaction);
    //                 request.input('doctor_id',Sql.Int,new_doctor_id);
    //                 request.input('course_id',Sql.Int,course_id);
    //                 request.input('academic_year',Sql.NVarChar,academic_year); 
    //                 request.execute('CREATE_NEW_CourseDoctor')  ;
    //                 transaction.commit()
    //                 .then(new_doctor=>{
    //                     return new_doctor; 
    //                 })
    //             }
    //         } 
    //     })
    //     .catch(err=>{
    //         transaction.rollBack();
    //         return err;
    //     })
    // })

    // .catch(err=>{
    //     return err;
    // })
   
}

export async function updateUser(user_id,user_name, user_email,user_password,user_type,user_department){
    const pool=await poolPromise;
    const request= await pool.request();
    request.input('id',Sql.Int,user_id);
    request.input('user_name',Sql.NVarChar,user_name);
    request.input('user_email',Sql.NVarChar,user_email);
    request.input('user_password',Sql.NVarChar,user_password);
    request.input('user_type',Sql.Int,user_type);
    request.input('user_department',Sql.Int,user_department)
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


