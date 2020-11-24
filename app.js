const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      // YOUR CODE HERE:
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
      {
        type: "input",
        name: "managerName",
        message: "What is your name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          } else {
            console.log(" Invalid. This field cannot be blank.")
            return false;
          }
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your employee ID?",
        validate: managerId => {
          const pass = /^[1-9]\d*$/.test(managerId); //Allows numbers and letters and numbers
          if (pass) {
            return true;
          } else {
            console.log(' Invalid input. Please enter a valid employee ID.')
            return false;
          }
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your email address?",
        validate: function(managerEmail) {
          const pass = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(managerEmail);
          if (pass) {
            return true;
          } else {
            console.log(' Invalid email address. Please enter a valid email address!')
          }
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your office telephone number?",
        validate: managerOfficeNumber => {
          const pass = /^\d{10}$/.test(managerOfficeNumber); //Allows 10 number format
          if (pass) {
            return true;
          } else {
            console.log(' Invalid input. Please enter a valid phone number (10 digits)!');
            return false;
          }
        }
      },
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch (userChoice.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      {
        type: "input",
        name: "engineerName",
        message: "What is your name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          } else {
            console.log("Please enter a valid input containing at least one character!");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your employee ID?",
        validate: engineerId => {
          const pass = /^[1-9]\d*$/.test(engineerId);
          if (pass) {
            return true;
          } else {
            console.log('Invalid. This filed cannot be empty!');
            return false;
          }
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your email address?",
        validate: engineerEmail => {
          const pass = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(engineerEmail);
          if (pass) {
            return true;
          } else {
            console.log('Invalid email. Please enter a valid email address!');
            return false;
          }
        }
      },
      {
        type: "input",
        name: "engineerUsername",
        message: "What is your GitHub username?",
        validate: engineerUsername => {
          const pass = /^[1-9]\d*$/.test(engineerUsername); //Allows letters, numbers and underscores
          if (pass) {
            return true;
          } else {
            console.log('Invalid, this field cannot be blank.');
            return false;
          }
        }
      },
    ]).then(answers => {
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerUsername);
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      teamMembers.push(engineer);
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      idArray.push(answers.engineerId);

      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      {
        type: "input",
        name: "internName",
        message: "What is your name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          } else {
            console.log('Please enter a valid input containing at least one character!');
            return false;
          }
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is your employee ID?",
        validate: internId => {
          const pass = /^[1-9]\d*$/.test(internId);
          if (pass) {
            return true;
          } else {
            console.log('Invalid. This filed cannot be empty!');
            return false;
          }
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your email address?",
        validate: internEmail => {
          const pass = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(internEmail);
          if (pass) {
            return true;
          } else {
            console.log('Invalid email. Please enter a valid email address!');
            return false;
          }
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "What university did you attend?",
        validate: answer => {
          if (answer !== "") {
            return true;
          } else {
              console.log('Please enter a valid input containing at least one character!');
              return false;
          }
        }
      },
    ]).then(answers => {
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      teamMembers.push(intern);
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      idArray.push(answers.internId);

      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}

appMenu();