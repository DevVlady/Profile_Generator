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
          }
          return "Please enter a valid input containing at least one character!"
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your employee ID?",
        validate: answer => {
          const pass = answer.math(/^[1-9]\d*$/); //Allows numbers and letters and numbers
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your email address?", //Provide options folling @ symbol
        validate: answer => {
          const pass = answer.math(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your office telephone number?",
        validate: answer => {
          const pass = answer.math(/^\d{10}$/); //Allows number format
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
        validate: answer => {
          const pass = answer.math(/^[1-9]\d*$/);
          if (pass) {
            return true;
          } else {
            console.log('Invalid email. Please enter a valid email format.');
            return false;
          }
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your email address?",
        validate: answer => {
          const pass = answer.math(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
      },
      {
        type: "input",
        name: "engineerUsername",
        message: "What is your GitHub username?",
        validate: answer => {
          const pass = answer.math(/\W/); //Allows letters, numbers and underscores
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
          }
          return "Please enter a valid input containing at least one character!"
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is your employee ID?",
        validate: answer => {
          const pass = answer.math(/^[1-9]\d*$/);
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your email address?",
        validate: answer => {
          const pass = answer.math(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "What university did you attend?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter a valid input containing at least one character!"
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