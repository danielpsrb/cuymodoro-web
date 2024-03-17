const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cuymodoro-db'
})

connection.connect((err) => {
    if (err) {
        console.log("Error connected to MySQL Database", err);
        return;
    }
    console.log('Connected to database');
})

module.exports = connection