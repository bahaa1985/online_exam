import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cookieParser from 'cookie-parser';
import sql_connect from "./Controller/sql_connect_api.js";
import admin_router from "./Router/admin_router.js";
import doctor_router from "./Router/doctor_router.js";
import course_router from "./Router/course_router.js";
import question_router from "./Router/question_router.js";
import terms_router from "./Router/terms_router.js"
import department_router from "./Router/department_router.js";
import register_router from "./Router/registration_router.js";
import user_type_router from "./Router/user_type_router.js";
import login_router from "./Router/login_router.js";
import logout_router from "./Router/logout_router.js";
import verify_token_router from "./Router/verify_token_router.js";
import exam_router from "./Router/exam_router.js";

const urlEncoded=bodyParser.urlencoded({extended:false});

const app=express()//

app.use(urlEncoded)
app.use(bodyParser.json());
app.use(cookieParser())
//home page Routing:
app.get('/',(req,res)=>{
    sql_connect.then(()=>{    
        res.send(`<h1>Successed connection!</h1><br><p>${process.env.DATABASE_URL}</p>`)
    })
    .catch((err)=>{
        res.send(`<h1>Unuccessed connection!</h1><br><p>${process.env.DATABASE_URL}</p>`)
        console.log(err)
    })     
})

//Routing:

app.use('/courses',course_router);
app.use('/questions',question_router);
app.use('/terms',terms_router);
app.use('/departments',department_router);
app.use('/register',register_router);
app.use('/login',login_router);
app.use('/logout',logout_router)
app.use('/user_type',user_type_router)
app.use('/verify',verify_token_router)
app.use('/exams',exam_router);
//Listening server
app.listen(8000,()=>{
    console.log("Hello")
})