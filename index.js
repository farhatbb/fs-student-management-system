#! /usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, courseEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = courseEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "please select an option:\n",
        choices: ["Enroll a student", "show student status"]
    });
    if (action.ans === "Enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "please Enter your name:"
        });
        let trimedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimedStudentName) === false) {
            if (trimedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log(" \n\tYour account has been created");
                console.log(`Welcome, ${trimedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "please select a course",
                    choices: ["IT", "English", "Graphic"]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English":
                        courseFees = 500;
                        break;
                    case "Graphic":
                        courseFees = 300;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course"
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("You have enrolled in this course");
                }
            }
            else {
                console.log("invalid Name");
            }
        }
        else {
            console.log("this name is already exists");
        }
    }
    else if (action.ans === "show student status") {
        if (students.length !== 0) {
            let studentNameCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "please select name",
                choices: studentNameCheck
            });
            let foundStudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log("student information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("record is empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to contnue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
