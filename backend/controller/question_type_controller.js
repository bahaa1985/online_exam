import Sql from 'mssql';
import poolPromise from "./sql_connect_api.js";

export async function getQuestionTypes(){
    const pool=await poolPromise;
    const request=pool.request();
    const result=await request.query('SELECT * FROM QuestionType');
    const question_types = result.recordset;
    return question_types;
}