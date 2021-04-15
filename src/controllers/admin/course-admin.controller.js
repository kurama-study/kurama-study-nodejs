const Course = require('../../models/course.model');
const User = require('../../models/user.model');
const Calendar = require('../../models/calendar.model');
const create = async (req, res) => {
    try {
        const {course, calenders} = req.body;
        const teacher = await User.findOne({_id: course.teacher});
        if (teacher) {
            teacher.status = true;
            course.code = new Date().getTime();
            const courseSave = new Course(course);
            await courseSave.save();
            await teacher.save();
            calenders.forEach(calender => {
                calender.course = courseSave._id;
            })
            await Calendar.insertMany(calenders)
            res.status(200).send(course);
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
            Course.deleteOne(req.body.id);
            return res.status(200).send({message: 'Delete success'});
        } else {
            return res.status(500).send({message: 'Not found course'});
        }
    } catch (e) {
        return res.status(500).send({message: 'Not found course'});
    }

}


module.exports = {
    create,
    getList,
    getCourseDetail,
    updateCourseStatus
}
