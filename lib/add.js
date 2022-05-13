// requires npms
const inquirer = require("inquirer");
const mySQL = require("mysql2");
const table = require("console.table");

// add, update, and view
const add = require("./lib/add");
const update = require("./lib/update");
const view = require("./lib/view"); 
const Connection = require("mysql2/typings/mysql/lib/Connection");

// create a link between database and .js
const db = mySQL.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "employee_db",
    }
);