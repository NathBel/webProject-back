const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const url = require('url');

const dbUrl = process.env.DATABASE_URL; // assuming this is where you have stored the DSN
const params = url.parse(dbUrl);


const connection = mysql.createConnection({
        connectionLimit: 10,
        //  host: params.hostname,
        //  user: params.auth.split(':')[0],
        //  password: params.auth.split(':')[1],
        //  database: params.pathname.slice(1),
        //  port: params.port, 
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT, 
});

module.exports = connection;



//connection.end();
