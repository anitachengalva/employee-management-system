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

// welcome message
function init() {
    console.log("Welcome to the Employee Database")
    userChoices();
}

// inquirer prompt
function userChoices(){
inquirer
    .prompt([
        {
            type: "list",
            name: "startOptions",
            message: "Please select an option: ",
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
        if(startOptions === "viewAllDepartments") {
            viewAllDepartments();
        }
        else if(startOptions === "viewAllRoles") {
            viewAllRoles();
        }
        else if(startOptions === "viewAllEmployees") {
            viewAllEmployees();
        }
        else if(startOptions === "addDepartment") {
            add.addDepartment();
        }
        else if(startOptions === "addRole") {
            addRole();
        }
        else if(startOptions === "addEmployee") {
            addEmployee();
        }
        else if(startOptions === "updateRole") {
            updateRole();
        }
        else if(startOptions === "EXIT") {
            Connection.end();
            return
        }
    });
}

// VIEW functions
    // view all departments

    // view all roles

    // view all employees

// ADD functions
    // add department

    // add role

    // add employee

// UPDATE functions
    // update role