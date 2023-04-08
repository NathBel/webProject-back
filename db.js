const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
         connectionLimit: 10,
         host     : process.env.HOST,
         user     : process.env.USER,
         password : process.env.PASSWORD,
         database: process.env.database,
         port: process.env.DB_PORT
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
  module.exports = connection;






//connection.end();
