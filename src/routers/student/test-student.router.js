const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');
const testController = require('../../controllers/student/test-student-controller');

router.post('/getListTestByCourse', auth, testController.getListTestByCourse);
router.post('/getDetailTestLesson', auth, testController.getDetailTestLesson);
router.post('/answerLesson', auth, testController.answerLesson);
router.post('/saveCount', auth, testController.saveCountScore);
router.post('/changeStatus', auth, testController.changeStatus)

module.exports = router
