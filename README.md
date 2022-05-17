
# EMPLOYEE MANAGEMENT SYSTEM

## Description

This is a command-line content management system application that accepts user input (with the use of the Inquirer npm), to generate an interactive employee database in SQL. FORIGN KEYS are utilized to link tables.  

The purpose of this specific application is to manage an employee database. There are options to add a departement, add a role (assigned to a department), add an employee (assigned to a role), link an employee to their manager (another employee), and to update an employee's role. Additionally, the console.table npm is utilized in console to view all departments, view all employees, or view all roles.


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## How To Use

Firstly, the user must ensure that Node.js is installed. Then, after pulling the code, run an npm i to install all prevalent npm's included in this program. Then launch the terminal. Ensure that the directory has been changed to the root of the application. Then enter "node index.js" to begin. Using the arrow keys, choose any action to follow through. If the user hits "EXIT", the my SQL connection is ended. If the user choses any other prompt on the list, at the end of the action the program asks "Would you like to exit, or keep working?". Again, hitting EXIT will end the connection. If the user selects "Keep Working", it will loop the code back to the initial question list.


## Video Demo

[Application Walkthrough](https://drive.google.com/file/d/1iUgUJ5FyIqaPEr8OpEGFD_6nUMTR7vjR/view)


## Contributors

Thank you for taking the time to check out my README.md  
The creater of this appliction is myself, Anita Chengalva. 
[GitHub](https://github.com/anitachengalva/)  
[Email](webdev.anita@gmail.com)  


## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
This project is licensed under the MIT License