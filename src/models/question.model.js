const mongoose = require('mongoose')
const questionSchema = mongoose.Schema({
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test',
    },
    question: {
        type: String,
        require: true,
    },
    score: {
        type: String,
        require: true,
    }

})

const Question = mongoose.model('question', questionSchema);
module.exports = Question;
