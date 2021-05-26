const mongoose = require('mongoose')

const testSchema = mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    },
    status: {
        type: Boolean,
        require: true,
    }

})

const Course = mongoose.model('test', testSchema);
module.exports = Course;
