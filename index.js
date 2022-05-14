// requires npms
const inquirer = require("inquirer");
const mySQL = require("mysql2");
const table = require("console.table");

// create a link to database
const connection = mySQL.createConnection(
    {
        host: "localhost",
        port: "3300",
        user: "root",
        password: "mysql",
        database: "employee_db",
    }
);

// check connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected at " + connection.threadId);
    welcome();
});

// welcome message
function welcome() {
    console.log("Welcome to the Employee Database");
    userChoices();
}

// inquirer prompt
function userChoices() {
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

    // returns promise
    // how the code responds to each possible user input choice
    .then(({ startOptions }) => {
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
    function viewAllDepartments() {
        console.log("Viewing all Departments");
        connection.query("SELECT * FROM departments", function (err, res) {
            if (err) throw err;
            console.table(res);
            nowDone();
        })
    }

    // view all roles
    function viewAllRoles() {
        console.log("Viewing all Roles");
    }

    // view all employees
    function viewAllEmployees() {
        console.log("Viewing all Employees")
    }

// ADD functions
    // add department
    function addDepartment() {

    }

    // add role
    function addRole() {

    }

    // add employee
    function addEmployee() {

    }

// UPDATE functions
    // update role
    function updateRole() {

    }