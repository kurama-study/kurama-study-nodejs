const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');
const courseController = require('../../controllers/teacher/course-teacher.controller');

router.post('/getListCourse', auth, courseController.getListCourse);
module.exports = router
