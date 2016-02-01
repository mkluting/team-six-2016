var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'voyage'
});
connection.connect();

module.exports = connection;
