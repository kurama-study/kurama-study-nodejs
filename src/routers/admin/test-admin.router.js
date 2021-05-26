const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const testController = require('../../controllers/admin/test-admin-controller');

router.post('/createTestLesson', auth, testController.createTestLesson);
router.post('/getListTestByCourse', auth, testController.getListTestByCourse);
router.post('/getDetailTestLesson', auth, testController.getDetailTestLesson);
router.post('/deleteTestLesson', auth, testController.deleteTestLesson);
module.exports = router
