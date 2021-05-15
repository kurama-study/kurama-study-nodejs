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
                    "created_at": new Date(item.date),
                    "duration": 60,
                    "host_id": "AbcDefGHi",
                    "id": 1100000,
                    "join_url": "https://zoom.us/j/1100000",
                    "settings": {
                        "alternative_hosts": "",
                        "approval_type": 2,
                        "audio": "both",
                        "auto_recording": "local",
                        "close_registration": false,
                        "cn_meeting": false,
                        "enforce_login": false,
                        "enforce_login_domains": "",
                        "breakout_room": {
                            "enable": false,
                            "host_video": false,
                            "in_meeting": false,
                            "join_before_host": true,
                            "mute_upon_entry": false,
                            "participant_video": false,
                            "registrants_confirmation_email": true,
                            "use_pmi": false,
                            "waiting_room": false,
                            "watermark": false,
                            "registrants_email_notification": true
                        },
                        "start_time": new Date(item.date),
                        "start_url": "https://zoom.us/s/1100000?iIifQ.wfY2ldlb82SWo3TsR77lBiJjR53TNeFUiKbLyCvZZjw",
                        "status": "waiting",
                        "timezone": "Asia/Saigon",
                        "topic": item.note,
                        "type": 2,
                        "uuid": "OPbNpbfAR9ysZttKzOtJdQ"
                    }
                }
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
