// Get the client
// import mysql from 'mysql2/promise';
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('mydatabase', 'root', '123456', {
     host: 'localhost',
     dialect: 'mysql',
     logging: false
});

let connectDB = async () => {
     try {
          await sequelize.authenticate();
          console.log('Connection has been established successfully.');
     } catch (error) {
          console.error('Unable to connect to the database:', error);
     }
}
// Create the connection to database
// const connection = mysql.createPool({
//      host: 'localhost',
//      user: 'root',
//      database: 'mydatabase',
//      password: '123456'
// });

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

export default connectDB;