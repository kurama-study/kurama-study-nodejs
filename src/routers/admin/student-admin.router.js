const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');
const studentAdminController = require('../../controllers/admin/student-admin.controller');

router.post('/createStudent', auth ,studentAdminController.create);
router.get('/getListStudent', auth, studentAdminController.getList);

module.exports = router;
