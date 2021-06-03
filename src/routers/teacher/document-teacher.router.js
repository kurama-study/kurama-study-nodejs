const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');
const documentController = require('../../controllers/teacher/document-teacher.controller');

router.post('/createDocument', auth, documentController.createDocument);
router.post('/getListDocument', auth, documentController.getListDocument);
router.post('/deleteDocument', auth, documentController.deleteDocument);
module.exports = router
