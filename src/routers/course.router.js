const express = require('express')
const router = express.Router()
import * as courseController from '../controllers/course.controller';
const auth = require('../middleware/auth');

router.post('/create', auth,courseController.create);
router.get('/list', auth, courseController.getList);
router.post('/getFindById', auth, courseController.findById);
router.post('/register', auth, courseController.registerCourse);

export default router;
