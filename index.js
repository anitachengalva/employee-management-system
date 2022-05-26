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
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected at " + db.threadId);
    welcome();
});

// welcome message
function welcome() {
    console.log("\n" + "Welcome to the Employee Management Database" + "\n");
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
            switch (startOptions) {
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
    console.log("\n" + "Viewing All Departments");
    db.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        nowDone();
    })
}

// view all roles
function viewAllRoles() {
    console.log("\n" + "Viewing All Roles");
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        nowDone();
    })
}

// view all employees
function viewAllEmployees() {
    console.log("\n" + "Viewing All Employees");
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        nowDone();
    })
}
// error occuring where when running viewAllEmployees, the prompt for addDepartments appears after employee list ????

// ADD functions
// add department
function addDepartment() {
    inquirer.prompt({
        message: "What is the name of the department you would like to add?",
        name: "department",
        type: "input"
    })

        .then(({ department }) => {
            console.log("Adding New Department");
            db.query("INSERT INTO employee_db.departments (name) VALUES (?)", [department], function (err, res) {
                if (err) {
                    throw err;
                } else {
                    console.log("\n" + "Sucessfully added new department!");
                    viewAllDepartments();
                    nowDone();
                }
            })
        })

}

// wrap promise
function queryAllDepartments() {
    return new Promise(function (resolve, reject) {
        const sql = `SELECT * FROM departments`;
        db.query(sql, function (err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function queryAllRoles() {
    return new Promise(function (resolve, reject) {
        const sql = `SELECT * FROM role`;
        db.query(sql, function (err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function queryAllEmployees() {
    return new Promise(function (resolve, reject) {
        const sql = `SELECT * FROM employee`;
        db.query(sql, function (err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

// add role
// turns database table into a variable that can be passed into Inquire
async function addRole() {
    const departments = await queryAllDepartments();
    const departmentObjects = departments.map(({ id, name }) => ({
        name: name,
        value: id,
    }))

    inquirer.prompt([
        {
            message: "What is the title of the role you would like to add?",
            name: "title",
            type: "input"
        },
        {
            message: "What is the salary of this role?",
            name: "salary",
            type: "number",
            validate:function(input){
                if (input !=NaN){
                    return true;
                }
                return false;
            }
        },
        {
            message: "Please select which department this role belongs in",
            name: "departmentID",
            type: "list",
            choices: departmentObjects
        }
    ])

        .then(( response ) => {
            console.log("Adding New Role", response);
            db.query("INSERT INTO role (title, salary, department_id) values (?,?,?)",
                [response.title, response.salary, response.departmentID], function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.log("\n" + "Sucessfully added new role!");
                        viewAllRoles();
                    }
                })
        })
}

// add employee
// turns database table into a variable that can be passed into Inquire
async function addEmployee() {
    const roles = await queryAllRoles();
    const roleObjects = roles.map(({ id, title, salary, department_id }) => ({
        name: title,
        value: id,
        // do I need to add lines for salary and department_id as well?
    }))
    const employees = await queryAllEmployees();
    const employeeObjects = employees.map(({ id, first_name, last_name, role_id, manager_id }) => ({
        name: first_name, last_name, // is this the correct way to list name?
        value: id,
    }))

    inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: "firstName",
            type: "input"
        },
        {
            message: "What is the employee's last name?",
            name: "lastName",
            type: "input"
        },
        {
            message: "What is the employee's role?",
            name: "roleID",
            type: "list",
            choices: roleObjects
        },
        {
            message: "Who is the employee's manager?",
            name: "managerID",
            type: "list",
            choices: employeeObjects
        }
    ])

        .then(( response ) => {
            console.log("Adding New Employee", response);
            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)",
                [response.firstName, response.lastName, response.roleID, response.managerID], function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.log("\n" + "Sucessfully added new employee!");
                        viewAllEmployees();
                        nowDone();
                    }
                }
            )

        })
}

// UPDATE functions
// update role
// this doesn't work - need to update
async function updateRole() {

    const roles = await queryAllRoles();
    const roleObjects = roles.map(({ id, title, salary, department_id }) => ({
        name: title,
        value: id,
        // do I need to add lines for salary and department_id as well?
    }))
    const employees = await queryAllEmployees();
    const employeeObjects = await employees.map(({ id, first_name, last_name, role_id, manager_id }) => ({
        name: first_name, last_name, // is this the correct way to list name?
        value: id,
    }))

    console.log(await employeeObjects)
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        const role = res.map(element => {
            return element.id
        })
    })
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        const employees = res.map(element => {
            return element.id
        })
    })

    viewAllRoles();
    inquirer.prompt([
        {
            message: "Please select the employee whose role you would like to change: ",
            name: "updateEmployee",
            type: "list",
            choices: employeeObjects
        },
        {
            message: "Which role would you like to change to",
            name: "updateRole",
            type: "list",
            choices: roleObjects
        }
    ])

        .then(({ update }) => {
            console.log("Updating Role");
            // replace prexisting role
            db.query("INSERT INTO employee_db.employee (role) VALUES (?)",
                [update.role], function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.log("\n" + "Sucessfully updated role!");
                        viewAllEmployees();
                        nowDone();
                    }
                })
        })
}

// EXIT code
function nowExit() {
    console.log("\n" + "Goodbye.");
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
            switch (done) {
                case true:
                    // go back to initial inquirer prompt with start questions
                    userChoices();
                    break;
                case false:
                    nowExit();
                    break;
            };
        });
}