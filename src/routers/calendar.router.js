const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const calendarController = require('../controllers/calendar.controller');

router.post('/searchCalendarForTeacher', auth, calendarController.searchCalendarForTeacher);
router.get('/getListCalendarOfTeacher', auth, calendarController.getListCalendarOfTeacher);
module.exports = router;
