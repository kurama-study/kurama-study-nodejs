const Test = require('../../models/test.model');
const Course = require('../../models/course.model');


const getListTestByCourse = async (req, res) => {
    try {
        const listCourse = await Course.find({teacher: req.body.uid})
        const listTest = await Test.find().where('course').in(listCourse);
        return res.status(200).send(listTest);
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}
const changeStatusTest = async (req, res) => {
    try {
        const testLesson = await Test.findOne({_id: req.body.test});
        testLesson.status = !testLesson.status;
        await testLesson.save();
        return res.status(200).send({message: 'Success'});
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}
module.exports = {
    getListTestByCourse,
    changeStatusTest
}
