const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dansp86!',
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