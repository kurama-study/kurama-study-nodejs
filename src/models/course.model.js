const mongoose = require('mongoose')
const Schema = require("mongoose");

const courseSchema = mongoose.Schema({
    code: String,
    name: String,
    total_student: Number,
    teacher: {},
    total_lesson: Number,
    calendars: [{
        time: String,
        date: Date,
    }],
    user: [{
        user_id: Schema.Types.ObjectId,
    }],

})

const Course = mongoose.model('course',courseSchema);
module.exports = Course;
