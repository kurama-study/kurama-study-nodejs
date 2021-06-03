const express = require('express')
const router = express.Router()
const courseController = require( '../../controllers/student/course-student.controller');
const auth = require('../../middleware/auth');

router.get('/list', auth, courseController.getList);
router.post('/getFindById', auth, courseController.findById);
router.post('/register', auth, courseController.register)
router.post('/listCourseRegistered', auth, courseController.getListCourseRegistered);
router.post('/cancel', auth, courseController.cancel);
router.post('/cancelCourse', auth, courseController.cancelCourse);
router.post('/payment', auth, courseController.payment)
module.exports = router;
