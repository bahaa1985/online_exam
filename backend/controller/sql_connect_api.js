import sql from 'mssql';
import 'dotenv/config'

const config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.HOST, // You can use 'localhost\\instance' to connect to named instance
    port:parseInt(process.env.PORT),
    database: process.env.DATABASE_NAME,
    options: {
      encrypt: true, // Use this if you're on Windows Azure,
      trustServerCertificate: true 
    },
  };

const poolPromise = new sql.ConnectionPool(config)
.connect()
.then((pool) => {
  console.log('Connected to MSSQL');
  return pool;
})
.catch((err) => console.log('Database Connection Failed! Bad Config: ', err));

export default poolPromise;

