import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import sql_connect from "./Controller/sql_connect_api.js";
import admin_router from "./Router/admin_router.js";
import doctor_router from "./Router/doctor_router.js";
import course_router from "./Router/course_router.js";
import question_router from "./Router/question_router.js";
import terms_router from "./Router/terms_router.js"
import department_router from "./Router/department_router.js";
import registration_router from "./Router/registration_router.js"
import user_type_router from "./Router/user_type_router.js";

const urlEncoded=bodyParser.urlencoded({extended:false});

const app=express()//

app.use(urlEncoded)

app.use(bodyParser.json());

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
app.use('/register',registration_router);
app.use('/user_type',user_type_router)
//Listening server
app.listen(8000,()=>{
    console.log("Hello")
})