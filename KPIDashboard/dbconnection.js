var mysql = require('mysql');
var connParams = require('./config');

//var dbconnection = mysql.createPool({
var dbconnection = mysql.createConnection({
    //connectionLimit: 100,
    host: connParams.db.host,
    port: connParams.db.port,
    user: connParams.db.user,
    password: connParams.db.password,
    database: connParams.db.database
});

dbconnection.connect(function (err) {
    if (!err) {
        console.log("mysql connected")
    } else {
        console.log("mysql connection lost");
    }
});

module.exports = dbconnection;