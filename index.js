// requires npms
const inquirer = require("inquirer");
const mySQL = require("mysql2");
const table = require("console.table");

// create a link to database
const db = mySQL.createConnection(
    {
        host: "localhost",
        port: "3001",
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
            db.end();
            return
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
        console.log("Add A Department");
        db.query("INSERT INTO departments SET ?", function (err, res) {
            if (err) throw err;
            // need help on this part
        })
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
    .then(({ nowDone }) => {
        if(nowDone === "true") {
            // go back to initial inquirer prompt with start questions
            userChoices();
        }
        else {
            console.log("Goodbye");
            db.end();
            return
        }
    });
}