require('dotenv').config()
const express = require('express')
const crypto = require('crypto')

const joinGroup = (req, res) => {
    const {meetingNumber, role} = req.body;
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(process.env.ZOOM_JWT_API_KEY + meetingNumber + timestamp + role).toString('base64')
    const hash = crypto.createHmac('sha256', process.env.ZOOM_JWT_API_SECRET).update(msg).digest('base64')
    const signature = Buffer.from(`${process.env.ZOOM_JWT_API_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
    res.json({
        signature: signature
    })
}
module.exports = {
    joinGroup
}
