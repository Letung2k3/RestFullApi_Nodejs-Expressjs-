// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = mysql.createPool({
     host: 'localhost',
     user: 'root',
     database: 'mydatabase',
     password: '123456'
});

// A simple SELECT query
// try {
//      connection.query(
//           `SELECT * from city`,
//           function (err, results, fields) {
//                console.log(results); // results contains rows returned by server
//                console.log(fields); // fields contains extra meta data about results, if available
//           }
//      )
// } catch (err) {
//      console.log(err);
// }

export default connection;