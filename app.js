const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const authRouter = require('./src/routers/auth.router');




const courseAdminRouter = require( './src/routers/admin/course-admin.router');
const teacherAdminRouter = require('./src/routers/admin/teacher.admin.router');
const studentAdminRouter = require('./src/routers/admin/student-admin.router');

const zoomRouter = require('./src/routers/zoom/zoom.router');

const courseStudentRouter = require('./src/routers/student/course-student.router');


const calendarRouter = require('./src/routers/calendar.router');

const mongoose = require('./src/config/mongodb.config') ;
require('dotenv').config();

const port = `${process.env.PORT}`;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use('/kurama/auth', authRouter);

// admin router
app.use('/kurama/admin/course', courseAdminRouter);
app.use('/kurama/admin/teacher', teacherAdminRouter);
app.use('/kurama/admin/student', studentAdminRouter);
app.use('/kurama/zoom', zoomRouter)
// student router
app.use('/kurama/student/course', courseStudentRouter)

app.use('/kurama/calendar', calendarRouter)


app.listen(port, () => {
    console.log('app running ' + port);
})
