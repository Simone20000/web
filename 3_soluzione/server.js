// imports
const express = require("express");
const morgan = require("morgan");
const path = require('path');

const {check, validationResult} = require('express-validator');

const dao = require("./dao.js");

// init 
const app = express();
const port = 3000;

// set up the middleware
app.use(morgan('tiny'));

// serving static request
app.use(express.static('client'));

// interpreting form-encoded parameters
app.use(express.urlencoded({ extended: true }));

// interpreting json-encoded parameters
app.use(express.json());

// REST API (corso, esame)
// Risorse: corso ed esame

// GET /courses
app.get('/api/courses', (req,res)=>{
    // read from db all the courses
    dao.getAllCourses()
    .then(courses => res.json(courses))
    .catch(error => res.status(500).json(error));
});

// GET /exams
app.get('/api/exams', (req,res)=>{
    dao.getAllExams()
    .then( exams => res.json(exams))
    .catch( error => res.status(500).json(error));
});

// GET exams and courses pages
app.get('*', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'client/index.html'));
});

app.listen(port, () => console.log(`server listening at http://localhost:${port}`));
