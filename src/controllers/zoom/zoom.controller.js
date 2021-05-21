require('dotenv').config()
const crypto = require('crypto')
const rp = require('request-promise');
const Calendar = require('../../models/calendar.model');
const Course = require('../../models/course.model');
const User = require('../../models/user.model');
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
const createMeetingPlan = async (req, res) => {
    try {
        const {course, listCalendar} = req.body;
        listCalendar.map(async item => {
                const test = {
                    "topic": item.note,
                    "type": 2,
                    "start_time": item.date+':00ICT',
                    "duration": 40,
                    "timezone": "Asia/Ho_Chi_Minh",
                    "password": "kurama",
                    "agenda": "kurama",
                }
                console.log(test.start_time)
                const options = {
                    method: "POST",
                    uri: "https://api.zoom.us/v2/users/OPbNpbfAR9ysZttKzOtJdQ/meetings",
                    body: test,
                    auth: {
                        bearer: process.env.OAUTH_ACCESS_TOKEN
                    },
                    headers: {
                        "User-Agent": "Zoom-api-Jwt-Request",
                        "content-type": "application/json"
                    },
                    json: true //Parse the JSON string in the response
                }
                 rp(options)
                    .then(async function(response) {
                        const calendar = new Calendar({
                            teacher: item.teacher,
                            date: item.date,
                            course: course._id,
                            note: item.note,
                            hostId: response.id,
                            password: response.password
                        });
                        await Calendar.create(calendar);
                    })
                    .catch(function(err) {
                        console.log("API call failed, reason ", err);
                    });
            });
        return res.status(200).send({message: 'success'});
    } catch (e) {
        res.status(500).send({message: 'error'});
    }
}
module.exports = {
    joinGroup,
     createMeetingPlan
}
