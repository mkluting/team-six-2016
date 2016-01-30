var mysql = require('mysql');

var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password1',
        database: 'voyage'
});
connection.connect();

module.exports = connection;