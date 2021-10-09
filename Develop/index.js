var inquirer = require('inquirer');
var generateMarkdown = require('./utils/generateMarkdown.js');
var fs = require('fs');

console.log('Hi, welcome to Node index.js');

  var questions = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "title",
            message: "What is the project name?",
            validate: projectTitle => {
                if (projectTitle) {
                  return true;
                } else {
                  console.log('Please enter your projectTitle!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "description",
            message: "Write a description of your project: ",
            validate: description => {
                if (description) {
                  return true;
                } else {
                  console.log('Please enter a valid description!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "installation",
            message: "Describe the installation process if any: "
        },
        {
            type: "input",
            name: "usage",
            message: "What is this project usage for?",
            validate: usage => {
                if (usage) {
                  return true;
                } else {
                  console.log('Please enter the usage!');
                  return false;
                }
              }
        },
        {
            type: "list",
            name: "license",
            message: "Chose the appropriate license for this project: ",
            choices: [
                "N/A",
                "Apache",
                "Academic",
                "GNU",
                "ISC",
                "MIT",
                "Mozilla",
                "Open"
            ]
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you this project with? (Check all that apply)',
          choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: "input",
            name: "contributing",
            message: "Who are the contributors of this projects?",
            validate: contributing => {
                if (contributing) {
                  return true;
                } else {
                  console.log('Please enter a name!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "tests",
            message: "Is there a test included?",
            validate: tests => {
                if (tests) {
                  return true;
                } else {
                  console.log('Please enter Y/N!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "questions",
            message: "What do I do if I have an issue? ",
            validate: questions => {
                if (questions) {
                  return true;
                } else {
                  console.log('Please enter your name!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "username",
            message: "Please enter your GitHub username: ",
            validate: username => {
                if (username) {
                  return true;
                } else {
                  console.log('Please enter your username!');
                  return false;
                }
              }
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email: ",
            validate: email => {
                if (email) {
                  return true;
                } else {
                  console.log('Please enter your email!');
                  return false;
                }
              }
        }
    ]
  ); 
  }
  

function writeToFile(fileName, data) {
  return new Promise((resolve, reject) => {
      fs.writeFile('./dist/README.md', fileName, err => {

        if (err) {
          reject(err);
          return;
        }
  

        resolve({
          ok: true,
          message: 'File created!'
        });
      });
    });
};


function init() {
  questions()
  .then( answers => {
      return generateMarkdown(answers);
  })
  .then(generatedMarkdown => {
      return writeToFile(generatedMarkdown);
  })
  .catch(err => {
      console.log(err);
  });

}

init();