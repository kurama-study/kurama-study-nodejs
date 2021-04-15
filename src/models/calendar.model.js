const mongoose = require('mongoose')
const calendarSchema = mongoose.Schema({
    teacher: {
        type: String,
        require: true,
    },
    student: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    course: {
        type: String,
        require: true,
    },
    note: {
        type: String,
        require: true,
    }
})
const Course = mongoose.model('calendar', calendarSchema);
module.exports = Course;
