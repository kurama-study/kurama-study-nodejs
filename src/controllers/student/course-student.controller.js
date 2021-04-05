const Course = require('../../models/course.model');
const User = require('../../models/user.model');

const getList = async (req, res) => {
    const courses = await Course.find({})
    if (courses !== null || courses || courses === []) {
        return res.status(200).send(courses);
    }
    return res.status(500).send('error')
}

const findById = async (req, res) => {
    const course = await Course.findOne({"_id": req.body.id})
    if (course != null) {
        const teacher = await User.findOne({"_id": course.teacher});
        course.teacher = {
            name: teacher.username,
            email: teacher.email
        }
        return res.status(200).send(course);
    }
    return res.status(500).send('error');
}
const register = async (req, res) => {
    try {
        User.findByIdAndUpdate(
            { _id: req.body.id },
            { $push: { courses: req.body.course } }
        ).then((docs) => {
            return res.status(200).send(User);

        });
    } catch (e) {
        return res.status(500).send('error');
    }
}

module.exports = {
    getList,
    findById,
    register
}
