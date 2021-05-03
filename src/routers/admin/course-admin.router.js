const express = require('express')
const router = express.Router()
const courseController = require( '../../controllers/admin/course-admin.controller');
const auth = require('../../middleware/auth');

router.post('/createCourse', auth, courseController.create);
router.get('/getListCourse', auth, courseController.getList);
router.post('/getFindById', auth, courseController.getCourseDetail);
router.post('/updateStatus', auth, courseController.updateCourseStatus)

module.exports = router;
