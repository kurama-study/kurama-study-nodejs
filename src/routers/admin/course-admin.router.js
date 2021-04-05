const express = require('express')
const router = express.Router()
const courseController = require( '../../controllers/admin/course-admin.controller');
const auth = require('../../middleware/auth');

router.post('/create', auth,courseController.create);
router.get('/list', auth, courseController.getList);
router.post('/getFindById', auth, courseController.findById);

module.exports = router;
