const User = require('../../models/user.model');
const Course = require('../../models/course.model');
const Test = require('../../models/test.model');
const Question = require('../../models/question.model');
const Answer = require('../../models/answer.model');
const createTestLesson = async (req, res) => {
    try {
        const {course, testLesson} = req.body;
        const testSave = new Test();
        testSave.name = testLesson.name;
        testSave.course = course;
        testSave.status = false;
        await testSave.save();
        testLesson.questions.map(async question => {
            const questionSave = {
                question: question.question,
                score: question.score,
                test: testSave._id
            }
            await Question.create(questionSave).then(result => {
                question.answers.map(async answer => {
                    const answerSave = {
                        question: result._id,
                        answer: answer.answer
                    }
                    await Answer.create(answerSave);
                })

            })
        })
        return res.status(200).send({message: 'Create success'});
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}
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
                question: question.question,
                answers: answers,
                score: question.score
            }
            questionList.push(questionItem);
        }
        return res.status(200).send([{testLesson: testLesson}, {questions: questionList}]);
    } catch {
        return res.status(500).send({message: 'System error'});
    }

}
const deleteTestLesson = async (req, res) => {
    try {
        const {test} = req.body;
        const questions = await Question.find({test: test});
        for (const question of questions) {
            await Answer.deleteMany({question: question._id});
        }
        await Question.deleteMany({test: test});
        await Test.deleteOne({_id: test});
        return res.status(200).send({message: 'Delete success'});
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}
module.exports = {
    createTestLesson,
    getListTestByCourse,
    getDetailTestLesson,
    deleteTestLesson
}
