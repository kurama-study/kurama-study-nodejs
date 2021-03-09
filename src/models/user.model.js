const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config();
const jwt_key = `${process.env.JWT_KEY}`
const mongoose = require('mongoose')
const Schema = require("mongoose");

const userSchema = mongoose.Schema({
        username: String,
        email: String,
        password: String,
        role: String,
        birth_day: String,
        location: String,
        major: String,
        img_url: String,
        courses: [{}],
        type: String,
        authorities: [
            {
                type: String,
                required: true
            }
        ],
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    })

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, jwt_key)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('user', userSchema)

module.exports = User
