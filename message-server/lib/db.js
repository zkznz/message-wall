const config = require("../config/default");
const mysql = require("mysql");

const db = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

module.exports = db;