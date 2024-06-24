const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PÁSSWORD,
    database: process.env.DB_DATABASE
})

connection.connect((error)=>{
    if (error){
        console.log('Error: ' + error);
        return;
    }
    console.log(' Conectado a la BD ');
});
module.exports = connection;