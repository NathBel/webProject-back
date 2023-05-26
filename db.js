const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const url = require('url');

const dbUrl = process.env.DATABASE_URL; // assuming this is where you have stored the DSN
const params = url.parse(dbUrl);


const connection = mysql.createConnection({
         connectionLimit: 10,
         host: params.hostname,
         user: params.auth.split(':')[0],
         password: params.auth.split(':')[1],
         database: params.pathname.slice(1),
         port: params.port,

         
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
    connection.execute("SHOW TABLES", (err, res) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
        console.log("All tables: ", res);
      }
    );
  });
  
  module.exports = connection;






//connection.end();
