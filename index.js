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

// inquirer prompt
inquirer
    .prompt([
        {
            type: "list",
            name: "start-options",
            message: "Welcome to the Employee Database. Please select an option: ",
            choices:
            [
                {
                name: "View All Departments",
                value: "viewAllDepartments"
                },
                {
                name: "View All Roles",
                value: "viewAllRoles"
                },
                {
                name: "View All Employees",
                value: "viewAllEmployees"
                },
                {
                name: "Add A Department",
                value: "addDepartment"
                },
                {
                name: "Add A Role",
                value: "addRole"
                },
                {
                name: "Add An Employee",
                value: "addEmployee"
                },
                {
                name: "Update An Employee's Role",
                value: "updateRole"
                },
                {
                name: "EXIT",
                }
            ]
        }
    ])

    // how the code responds to each possible user input choice
    .then(function(answer) {
        if(answer.choice === "View All Departments") {
            view.viewAllDepartments();
        }
        else if(answer.choice === "View All Roles") {
            view.viewAllRoles();
        }
        else if(answer.choice === "View All Employees") {
            view.viewAllEmployees();
        }
        else if(answer.choice === "Add A Department") {
            add.addDepartment();
        }
        else if(answer.choice === "Add A Role") {
            add.addRole();
        }
        else if(answer.choice === "Add An Employee") {
            add.addEmployee();
        }
        else if(answer.choice === "Update An Employee's Role") {
            update.updateRole();
        }
        else if(answer.choice === "EXIT") {
            Connection.end();
            return
        }
    });