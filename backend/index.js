import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import sql_connect from "./controller/sql_connect_api.js";
import admin_router from "./Router/admin_router.js";
import doctor_router from "./Router/doctor_router.js";
import course_router from "./Router/course_router.js";
import question_router from "./Router/question_router.js";

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
app.use('/admins',admin_router);
app.use('/doctors',doctor_router);
app.use('/courses',course_router);
app.use('/questions',question_router);

//Listening server
app.listen(8000,()=>{
    console.log("Hello")
})