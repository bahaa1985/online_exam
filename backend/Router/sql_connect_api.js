import express from 'express';
import sql from 'mssql';

const app=express();

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const config = {
    user: 'bahaa',
    password: 'Exam_2024',
    server: 'mssql-157297-0.cloudclusters.net', // You can use 'localhost\\instance' to connect to named instance
    port:10005,
    database: 'exam_db',
    options: {
      encrypt: true, // Use this if you're on Windows Azure,
      trustServerCertificate: true 
    },
  };

const sql_connect=sql.connect(config)

export default sql_connect

