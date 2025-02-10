
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pools = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
queueLimit: 0
});

pools.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database');
    connection.release(); 
  }
});

module.exports = pools.promise();
