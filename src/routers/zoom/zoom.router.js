const express = require('express')
const router = express.Router()
const zoomController = require('../../controllers/zoom/zoom.controller');
router.post('/join', zoomController.joinGroup)
router.post('/create', zoomController.createMeetingPlan);
module.exports=router
