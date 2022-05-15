// requires npms
const inquirer = require("inquirer");
const mySQL = require("mysql2");
const table = require("console.table");

// create a link to database
const db = mySQL.createConnection(
    {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "mysql",
        database: "employee_db",
    }
);

// check connection
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected at " + db.threadId);
    welcome();
});

// welcome message
function welcome() {
    console.log("Welcome to the Employee Management Database");
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

        switch(startOptions){
            case "viewAllDepartments":
                viewAllDepartments();
            break;
            case "viewAllRoles":
                viewAllRoles();
            break;
            case "viewAllEmployees":
                viewAllEmployees();
            case "addDepartment":
                addDepartment();
            break;
            case "addRole":
                addRole();
            break;
            case "addEmployee":
                addEmployee();
            break;
            case "updateRole":
                updateRole();
            break;
            case "EXIT":
                nowExit();
            break;
        }
    });
}

// VIEW functions
    // view all departments
    function viewAllDepartments() {
        console.log("Viewing all Departments");
        db.query("SELECT * FROM departments", function (err, res) {
            if (err) throw err;
            console.table(res);
            nowDone();
        })
    }

    // view all roles
    function viewAllRoles() {
        console.log("Viewing all Roles");
        db.query("SELECT * FROM role", function (err, res) {
            if (err) throw err;
            console.table(res);
            nowDone();
        })
    }

    // view all employees
    function viewAllEmployees() {
        console.log("Viewing all Employees");
        db.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            console.table(res);
            nowDone();
        })
    }

// ADD functions
    // add department
    function addDepartment() {

        inquirer.prompt({
            message: "What is the name of the department you would like to add?",
            name:"department",
            type: "input"
        })
        
        .then(({ department }) => {
            console.log("Adding A Department");
            db.query("INSERT INTO employee_db.departments (name) VALUES (?)", [response.department],function (err, res) {
                if (err) {
                    throw err;
                } else {
                    console.log("Sucessfully added new department!");
                    viewAllDepartments()
                }
            })
        })
        
    }

    // add role
    function addRole() {

    }

    // add employee
    function addEmployee() {

        //get list of roles
        //get list of employees
        //inquirer prompt for first name and last name, then pick a role
        //pick employee from list
        //pick role from list

    }

// UPDATE functions
    // update role
    function updateRole() {
        viewAllRoles();
        inquirer.prompt({
            message: "Please select the role you would like to update: ",
            name: "update",
            type: "input"
        }).then(function({update}){
            //db.query

        })
    }

// EXIT code
function nowExit() {
    console.log("Goodbye.");
    db.end();
    return
}

// function asked at the end of sections
// allows user to end or keep working
function nowDone() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "done",
            message: "Would you like to exit, or keep working?",
            choices: [
                {
                    name: "Keep Working",
                    value: true
                },
                {
                    name: "EXIT",
                    value: false
                }
            ]
        }
    ])

    // returns promise for user input
    .then(({ done }) => {
        
        switch(done){
            case true:
                // go back to initial inquirer prompt with start questions
                userChoices();
            break;
            case false:
                nowExit();
            break;
        }
    });
}