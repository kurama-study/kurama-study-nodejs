const mongoose = require('mongoose')
const calendarSchema = mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    date: {
        type: Date,
        require: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    },
    note: {
        type: String,
        require: true,
    }
})
const Course = mongoose.model('calendar', calendarSchema);
module.exports = Course;
