// requires npms
const inquirer = require("inquirer");
const mySQL = require("mysql2");

// create a link between database and .js
const db = mySQL.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "employee_db",
    }
)

// inquirer prompts
inquirer
    .prompt([
        {
            //
        },
        {
            //
        },
        {
            //
        },
    ])

// have one main inquirer prompt function
// other functions for get employees, get departments, get roles, add department, add role, add employee, update employee role

// join statements for sql