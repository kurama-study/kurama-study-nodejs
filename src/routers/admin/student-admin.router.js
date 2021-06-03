const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');
const studentAdminController = require('../../controllers/admin/student-admin.controller');

router.post('/createStudent', auth ,studentAdminController.create);
router.get('/getListStudent', auth, studentAdminController.getList);
router.post('/getListStudentByCourse', auth, studentAdminController.getListStudentByCourse);
router.post('/cancelCourse', auth, studentAdminController.cancelCourse);
router.post('/cancelStudent', auth, studentAdminController.cancelStudent);
router.post('/deleteStudent', auth, studentAdminController.deleteStudent);
router.post('/updateStudent', auth, studentAdminController.updateStudent);
module.exports = router;
