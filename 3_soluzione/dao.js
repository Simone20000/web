"use strict";

// DAO (Data Access Object) module for accessing course and exams

const sqlite = require("sqlite3");
const db = new sqlite.Database('exams.db', err => {
    if (err) throw err;
});

exports.getAllCourses = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM course';
        db.all(sql, (err,rows) => {
            if (err) {
                reject(err);
                return;
            }

            const courses = rows.map( (row)=> ({code:row.code, name:row.name, credits:row.CFU}));
            resolve(courses);
        });
    });
};

exports.getCourseByCode = function (courseCode) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM course WHERE code=?';
        db.get(sql, [courseCode], (err,row)=> {
            if (err) {
                reject(err);
                return;
            }
            if(row) {
                // send a res in JSON
                resolve({code:row.code, name:row.name, credits:row.CFU});
            }
            else {
                // send a res in JSON
                reject({error: 'Il corso non esiste.'});
            }
        });
    });
};

exports.getAllExams = function() {
    return new Promise((resolve, reject) => {
        // read from db all the exams
        const sql = "SELECT code, name, date, score, CFU, id FROM exam, course WHERE exam.course_code=course.code";
        db.all(sql, (err,rows)=> {
            if (err) {
                reject(err);
                return;
            }
            // transform 'rows' (query results) into an array of objects
            const exams = rows.map( row => ({
                code:row.code,
                name:row.name, 
                date:row.date, 
                score:row.score, 
                credits:row.CFU,
                id:row.id
            }));
            resolve(exams);
        });
    });
};

exports.getExamByCode = function(code) {
    return new Promise((resolve,reject) => {
        // read form db all the needed information of a course given a code
        const sql = "SELECT date, score, name, CFU, id FROM exam, course WHERE exam.course_code=course.code AND exam.course_code=?";

        db.get(sql, [code], (err,row)=> {
            if (err) {
                reject(err);
                return;
            }
            if(row) {
                // send a res in JSON
                resolve({
                    code:code,
                    name:row.name, 
                    date: row.date, 
                    score: row.score, 
                    credits:row.CFU,
                    id:row.id
                });
            }
            else {
                // send a res in JSON
                resolve({error: 'Esame non sostenuto'});
            }   
        });
    });
}

exports.insertNewExam = function (exam) {
    return new Promise((resolve,reject) => {
        const sql = "INSERT INTO exam(course_code, date, score) VALUES (?, DATE(?), ?)";
        db.run(sql, [exam.code,exam.date,exam.score], (err)=> {
            if (err) {
                reject(err);
                return;
            }
            resolve(exam.code);
        });
    });
}