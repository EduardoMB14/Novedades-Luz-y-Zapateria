const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
})

connection.connect((error)=>{
    if (error){
        console.log('Error: ' + error);
        return;
    }
    console.log(' Conectado a la BD ');
});
module.exports = connection;
