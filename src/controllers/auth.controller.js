const User = require('../models/user.model');

const login = async function (req, res) {
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await user.generateAuthToken();
        user.tokens = null;
        res.send({user, token});
}
const register = async function (req, res) {
    try {
        let user = new User(req.body)
        user.authorities.push(user.role);
        await user.save()
        let token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (e) {
        res.send(e);
    }
}
const logout = async function (req, res) {
    try {
        const _id = req.body.id
        const user = await User.findOne({_id} )
        const tokens = []
        user.tokens.forEach(token => {
            if (token.token !== req.body.token) {
                tokens.push(token);
            }
        })
        user.tokens = tokens;
        await user.save()
        res.send()
    } catch (e) {
        res.send(e)
    }
}
module.exports = {
    login,
    register,
    logout
}
