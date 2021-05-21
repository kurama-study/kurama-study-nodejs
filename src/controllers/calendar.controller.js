const Calendar = require('../models/calendar.model');

const searchCalendarForTeacher = async (req, res) => {
    try {
        const {teacher} = req.body;
        const calendars = await Calendar.find({teacher: teacher});
        return res.status(200).send(calendars);
    } catch (e) {
        return res.status(500).send({message: 'System error'});
    }
}
const getListCalendarOfTeacher = async (req, res) => {
    try {
        const calendars = await Calendar.find({teacher: req.query.teacher});
        return res.status(200).send(calendars);
    } catch (e) {
        return res.status(500).send({message: 'System error'});
    }
}
const getListCalendarOfStudent = async (req, res) => {
    try {
        const {listCourse} = req.body;
        const calendars = await Calendar.find().where('course').in(listCourse).populate('course')
        return res.status(200).send(calendars)
    } catch (e) {
        return res.status(500).send({message: 'System error'});
    }
}
const getListCalendarOfCourse = async (req, res) => {
    try {
        const calendars = await Calendar.find({course: req.query.course});
        return res.status(200).send(calendars);
    } catch (e) {
        return res.status(200).send({message: 'System error'});
    }
}
module.exports = {
    searchCalendarForTeacher,
    getListCalendarOfTeacher,
    getListCalendarOfCourse,
    getListCalendarOfStudent
}
