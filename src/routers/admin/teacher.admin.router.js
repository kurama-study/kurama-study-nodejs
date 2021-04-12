const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const teacherAdminController = require('../../controllers/admin/teacher-admin.controller')

router.get('/getListTeacher', auth, teacherAdminController.getList)
router.post('/createTeacher', auth, teacherAdminController.create)
router.get('/getDetailTeacher', auth, teacherAdminController.getDetail)
module.exports=router
