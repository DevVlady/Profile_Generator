// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee {
    comnstructor(name, id, email, gitHub) {
        super(name, id, email);
        this.hitghu = gitHub;
    }

    getRole() {
        return 'Engineer';
    }

    getGithub() {
        return this.gitHub;
    }
}

module.exports = Engineer;