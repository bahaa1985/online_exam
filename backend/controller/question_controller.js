import Sql from 'mssql'
import poolPromise from "./sql_connect_api.js";

export async function getQuestions(course_id){
    const pool=await poolPromise;
    const result=await pool.request_question().query(`SELECT * FROM Question WHERE course_id=${course_id}`)
    const questions=result.recordsets;
    return questions;
}

export async function createQuestion(questiontype_id,question_title,course_id,doctor_id,question_option,option_status){
    const pool=await poolPromise;
    const transaction=new Sql.Transaction(pool);
    const request_question = new Sql.Request(transaction);
    const request_option= new Sql.Request(transaction);
    
    await transaction.begin()
    .then(()=>{
        
        //New question paramaters: 
        request_question.input('questiontype_id',Sql.Int,questiontype_id);
        request_question.input('question_title',Sql.NVarChar,question_title);
        request_question.input('course_id',Sql.Int,course_id);
        request_question.input('doctor_id',Sql.Int,doctor_id);
        request_question.execute('CREATE_NEW_QUESTION')  //inserting new question:
        .then((result)=>{
            if(result.rowsAffected.length>0){
                console.log('returned value:',result.recordsets[0][0].new_question_id)
                const new_question_id=result.recordsets[0][0].new_question_id;
                if(new_question_id>0){//Question options paramaters:
                    
                    request_option.input('question_id',Sql.Int,new_question_id);
                    request_option.input('question_option',Sql.NVarChar,question_option);
                    request_option.input('option_status',Sql.Bit,option_status);
                    request_option.execute('CREATE_QUESTION_OPTIONS') //inserting the options:
                    .then((result)=>{
                        transaction.commit();
                        console.log('New question and its options is created!')
                        return result;
                    })
                    .catch((err)=>{
                        transaction.rollback();
                        console.log(err);
                        return err;
                    })
                    
                }                
            }
        })
        .catch((err)=>{
            transaction.rollback();
            console.log(err);
            return err;
        })
    })
    // .finally(()=>{
    //     if (pool) pool.close();
    // })
    
}

export async function updateQuestion(question_id,questiontype_id,question_title,course_id,doctor_id){
    const pool=await poolPromise;
    const request_question= await pool.request_question();
    request_question.input('question_id',Sql.Int,question_id);
    request_question.input('questiontype_id',Sql.Int,questiontype_id);
    request_question.input('question_title',Sql.NVarChar,question_title);
    request_question.input('course_id',Sql.Int,course_id);
    request_question.input('doctor_id',Sql.Int,doctor_id);

    const result=request_question.execute('UPDATE_QUESTION');
    return result;
}

export async function deleteQuestion(question_id){
    const pool=await poolPromise;
    const request_question= await pool.request_question();
    request_question.input('question_id',Sql.Int,question_id);
    const result=request_question.execute('DELETE_QUESTION');
    return result;
}

export async function createQuestionOptions(question_id,question_option,option_status){
    const pool=await poolPromise;
    const request_question= await pool.request_question();
    request_question.input('question_id',Sql.Int,question_id);
    request_question.input('question_option',Sql.NVarChar,question_option);
    request_question.input('option_status',Sql.Bit,option_status);
    const result=request_question.execute('CREATE_QUESTION_OPTIONS');
    return result;
}

export async function updateQuestionOptions(option_id,question_option,option_status){
    const pool=await poolPromise;
    const request_question= await pool.request_question();
    request_question.input('option_id',Sql.Int,option_id);
    request_question.input('question_option',Sql.NVarChar,question_option);
    request_question.input('option_status',Sql.Bit,option_status);
    const result=request_question.execute('UPDATE_QUESTION_OPTIONS');
    return result;
}

export async function deleteQuestionOptions(option_id){
    const pool=await poolPromise;
    const request_question= await pool.request_question();
    request_question.input('option_id',Sql.Int,option_id);
    const result=request_question.execute('DELETE_QUESTION_OPTIONS');
    return result;
}