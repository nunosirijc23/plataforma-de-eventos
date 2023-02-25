const mysql = require('mysql2');

const connection = mysql.createConnection({
    user: 'root',
    password: 'root1234',
    database: 'events',
    host: 'database',
    port: 3306
});

module.exports = { connection };