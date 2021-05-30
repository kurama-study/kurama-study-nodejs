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
    studentQuantity: {
        type: Number,
        require: true,
    },
    lessonQuantity: {
        type: Number,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    price: {
        type: Number,
        require: true
    },
    studentRegistered: {
        type: Number,
        require: true
    },
    learned: {
        type: Number,
        require: true
    }

})

const Course = mongoose.model('course', courseSchema);
module.exports = Course;
