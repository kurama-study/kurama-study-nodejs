const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const kurama = express();

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


kurama.use(express.json());
kurama.use(express.urlencoded({ extended: false }));
kurama.use(bodyParser.urlencoded({ extended: false }));
kurama.use(bodyParser.json());
kurama.use(cors())

kurama.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

kurama.use('/kurama/auth', authRouter);

// admin router
kurama.use('/kurama/admin/course', courseAdminRouter);
kurama.use('/kurama/admin/teacher', teacherAdminRouter);
kurama.use('/kurama/admin/student', studentAdminRouter);
kurama.use('/kurama/zoom', zoomRouter)
// student router
kurama.use('/kurama/student/course', courseStudentRouter)

kurama.use('/kurama/calendar', calendarRouter)


kurama.listen(port, () => {
    console.log('kurama running ' + port);
})
