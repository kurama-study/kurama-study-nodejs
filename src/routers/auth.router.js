const express = require('express')
const router = express.Router()
import * as auth from '../controllers/auth.controller';

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/logout', auth.logout)
export default router;
