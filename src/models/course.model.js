const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    total_student: {
        type: Number,
        require: true,
    },
    total_lesson: {
        type: Number,
        require: true,
    },
    calendars: [{
        time: String,
        date: Date,
    }],
    status: {
        type: Boolean,
        require: true,
    },
    auth: {
        type: String,
        require: true,
    },
    teacher: {

    },

})

const Course = mongoose.model('courses',courseSchema);
module.exports = Course;
