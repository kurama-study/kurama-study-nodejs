const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const gplay = require('google-play-scraper');

router.post('/update', auth);
router.get('/search', (req, res) => {
    gplay.reviews({
        appId: 'com.mojang.minecraftpe',
        sort: gplay.sort.RATING,
        num: 3000
    }).then(value => res.send(value));
})
export default router;
