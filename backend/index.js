import express from "express";
import sql_connect from "./Router/sql_connect_api.js";
import "dotenv/config"
import admin_router from "./Router/admin_router.js";
import bodyParser from "body-parser";
const urlEncoded=bodyParser.urlencoded({extended:false});

const app=express()

app.use(urlEncoded)

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    
    res.send(`<h1>Hello</h1><br><p>${process.env.DATABASE_URL}</p>`)
    sql_connect.then(()=>{
        console.log("successed connection!")
    })
    .catch((err)=>{
        console.log(err)
    })     
   
})

app.use('/admins',admin_router)

app.listen(8000,()=>{
    console.log("Hello")
})