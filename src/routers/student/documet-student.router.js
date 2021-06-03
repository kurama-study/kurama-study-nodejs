const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');
const documentController = require('../../controllers/student/document-student.controller');
router.post('/getListDocument', auth, documentController.getListDocument);
module.exports = router;
