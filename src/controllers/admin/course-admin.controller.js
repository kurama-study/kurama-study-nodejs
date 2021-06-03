const Course = require('../../models/course.model');
const User = require('../../models/user.model');
const Calendar = require('../../models/calendar.model');
const create = async (req, res) => {
    try {
        const {course} = req.body;
        const teacher = await User.findOne({_id: course.teacher});
        if (teacher) {
            teacher.status = true;
            course.code = new Date().getTime();
            const courseSave = new Course(course);
            await teacher.save();
            await courseSave.save().then(value => {
                res.status(200).send(value);
            });
        } else {
            res.status(500).send({message: 'Not found teacher'});
        }

    } catch (e) {
        res.status(500).send({message: 'error'});
    }

}
const getList = async (req, res) => {
    const courses = await Course.find({})
    if (courses !== null || courses || courses === []) {
        return res.status(200).send(courses);
    }
    return res.status(500).send({message: 'error'});
}

const getCourseDetail = async (req, res) => {
    const course = await Course.findOne({"_id": req.body.id})
    if (course) {
        const teacher = await User.findOne({"_id": course.teacher});
        course.teacher = {
            name: teacher.username,
            email: teacher.email
        }
        return res.status(200).send(course);
    }
    return res.status(500).send({message: 'Not found course'});
}
const updateCourseStatus = async (req, res) => {
    try {
        const course = await Course.findOne({_id: req.body.id})
        if (course) {
            course.status = req.body.status;
            await course.save();
            return res.status(200).send(course);
        } else {
            return res.status(500).send({message: 'Not found course'});
        }
    } catch (e) {
        return res.status(500).send({message: 'Not found course'});
    }
}
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOne({_id: req.body.id})
        if (course) {
            await Course.deleteOne({_id: req.body.id});
            await Calendar.deleteMany({course: req.body.id})
            return res.status(200).send({message: 'Delete success'});
        } else {
            return res.status(500).send({message: 'Not found course'});
        }
    } catch {
        return res.status(500).send({message: 'Not found course'});

    }

}
const getCourseByStudent = async (req, res) => {
    try {
        const {listCourseId} = req.body
        const courseList = await Course.find({}).where('_id').in(listCourseId);
        return res.status(200).send(courseList);
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}
module.exports = {
    create,
    getList,
    getCourseDetail,
    updateCourseStatus,
    deleteCourse,
    getCourseByStudent
}
