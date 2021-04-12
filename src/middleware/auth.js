const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require('dotenv').config()
const jwt_key = `${process.env.JWT_KEY}`

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, jwt_key)
        try {
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) {
                return res.status(500).send('error user info');
            }
            next()
        } catch (error) {
            res.status(500).send(error);
        }
    } catch (e) {
        res.status(401).send(e);
    }


}
module.exports = auth;
