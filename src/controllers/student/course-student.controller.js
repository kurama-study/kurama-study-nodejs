const Course = require('../../models/course.model');
const User = require('../../models/user.model');
const Calendar = require('../../models/calendar.model');
const getList = async (req, res) => {
    const courses = await Course.find().populate({path: 'teacher'})
    if (courses !== null || courses || courses === []) {
        return res.status(200).send(courses);
    }
}

const findById = async (req, res) => {
    const course = await Course.findOne({"_id": req.body.id})
    if (course != null) {
        const teacher = await User.findOne({"_id": course.teacher});
        return res.status(200).send({course: course, teacher: teacher});
    }
    return res.status(500).send('error');
}
const getListCourseRegistered = async (req, res) => {
    try {
        let courseList = [];
        for (const value of req.body) {
            const course = await Course.findOne({_id: value.idCourse});
            courseList.push(course);
        }

        return res.status(200).send(courseList);
    } catch (e) {
        return res.status(500).send('error');
    }
}
const register = async (req, res) => {
    try {
        const course = await Course.findOne({_id: req.body.course.idCourse});
        const user = await User.findOne({_id: req.body.user});
        const calendars = await Calendar.find({course: course._id})
        if (course && user) {
            course.studentRegistered += 1;
            calendars.forEach(value => {
                user.calendars.push(value._id);
            })
            user.courses.push({course: course._id, status: false});
            await user.save();
            await course.save();
            return res.status(200).send(user);
        }
    } catch (e) {
        return res.status(500).send('error');
    }

}

module.exports = {
    getList,
    findById,
    register,
    getListCourseRegistered
}
