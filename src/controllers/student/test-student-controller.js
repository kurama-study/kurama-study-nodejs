const Test = require('../../models/test.model');
const Question = require('../../models/question.model');
const Answer = require('../../models/answer.model');
const User = require('../../models/user.model');
const getListTestByCourse = async (req, res) => {
    try {
        const listTest = await Test.find().where('course').in(req.body.courses);
        return res.status(200).send(listTest);
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}
const getDetailTestLesson = async (req, res) => {
    try {
        const {test} = req.body;
        const testLesson = await Test.findOne({_id: test});
        const questions = await Question.find({test: test});
        const questionList = [];
        for (const question of questions) {
            const answers = await Answer.find({question: question._id});
            const questionItem = {
                _id: question._id,
                question: question.question,
                answers: answers,
                score: null
            }
            questionList.push(questionItem);
        }
        return res.status(200).send([{testLesson: testLesson}, {questions: questionList}, {source: testLesson.course}]);
    } catch {
        return res.status(500).send({message: 'System error'});
    }

}
const answerLesson = async  (req, res) => {
    try {
        const {test, question, score} = req.body;
        const testLesson = await Test.findOne({_id: test});
        if (testLesson && testLesson.status === true) {
            const questionLesson = await Question.findOne({_id: question});
            if (questionLesson.score === score) {
                return res.status(200).send({score: true});
            } else {
                return res.status(200).send({score: false});
            }
        } else {
            return res.status(500).send({message: 'can`t continue'})
        }
    } catch {
        return res.status(500).send({message: 'system error'})
    }
}
const saveCountScore = async (req, res) => {
    try {
        const {uid, source, count} = req.body
        const user = await User.findOne({_id: uid});
        for (const value of user.courses) {
            if (value.course.toString() === source.toString()) {
               value.score = count;
               await user.save();

            }
        }
        return res.status(200).send(user);
    } catch {
        return res.status(500).send({message: 'system error'})
    }
}
module.exports = {
    getListTestByCourse,
    getDetailTestLesson,
    answerLesson,
    saveCountScore
}
