const User = require('../models/user.model');

const login = async function (req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await user.generateAuthToken();
        user.tokens = null;
        return  res.send({user, token});
    } catch {
        return res.status(500).send({message: 'system error'})
    }

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

module.exports = {
    login,
    register,
}
