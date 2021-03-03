const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
router.post('/update', auth)
export default router;
