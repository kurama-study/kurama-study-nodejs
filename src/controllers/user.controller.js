const User = require('../models/user.model')

const create = async function (req, res) {
    try {
        let user = new User(req.body)
        user.role = "USER_STUDENT";
        user.authorities.push(user.role);
        await user.save()
        let token = await user.generateAuthToken()
        res.send({user, token})
    }catch (e) {
        res.send(e)
    }
}
module.exports = {
    create,
}
