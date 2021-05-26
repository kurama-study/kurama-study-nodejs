const mongoose = require('mongoose')
const answerSchema = mongoose.Schema({

    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
    },
    answer: {
        type: String,
        require: true,
    }


})

const Answer = mongoose.model('answer', answerSchema);
module.exports = Answer;
