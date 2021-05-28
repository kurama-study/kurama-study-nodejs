const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');
const testController = require('../../controllers/teacher/test-teacher.controller');

router.post('/getListTest', auth, testController.getListTestByCourse);
router.post('/changeStatus', auth, testController.changeStatusTest);
module.exports = router
