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
        const {listCourseId} = req.body
        const courseList = await Course.find({}).where('_id').in(listCourseId);
        return res.status(200).send(courseList);
    } catch {
        return res.status(500).send({message: 'System error'});
    }


}
const register = async (req, res) => {
    try {
        const course = await Course.findOne({_id: req.body.course.idCourse});
        const user = await User.findOne({_id: req.body.user});
        if (course && user) {
            if (course.status === false) {
                return res.status(500).send({message: 'course blocked'})
            }
            else {
                course.studentRegistered += 1;
                course.students.push(user._id);
                user.courses.push({course: course._id, status: false, name: course.name});
                user.status = false;
                await user.save();
                await course.save();
                return res.status(200).send(user);
            }
        }
    } catch (e) {
        return res.status(500).send({message: 'error'});
    }

}

const cancel = async (req, res) => {
    try {
        const course = await Course.findOne({_id: req.body.course});
        const user = await User.findOne({_id: req.body.user});
        if (course && user) {
            if (course.status === false) {
                return res.status(500).send({message: 'course blocked'});
            } else {
                const courseList = [];
                user.courses.map(async value => {
                    if (value.course.toString() !== req.body.course.toString()) {
                        await courseList.push(value);
                    }
                })
                user.courses = courseList;
                await course.save();
                await user.save();
                return res.status(200).send(user);
            }
        } else {
            return res.status(500).send({message: 'error'});
        }

    } catch {
        return res.status(500).send({message:'error'});
    }
}
const cancelCourse = async (req, res) => {
    const {course, user} = req.body;
    const courseSave = await Course.findOne({_id: course});
    const students = [];
    courseSave.students.map(async student => {
        if (student.toString() !== user.toString()) {
            await students.push(student);
        } else {
            courseSave.studentRegistered -= 1;
        }
    })
    courseSave.students = students;
    await courseSave.save();
    return res.status(200).send({message: 'Success'});
}
const payment = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.uid});
        user.courses = req.body.courses;
        await user.save();
        return res.status(200).send(user);
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}
module.exports = {
    getList,
    findById,
    register,
    cancel,
    getListCourseRegistered,
    payment,
    cancelCourse
}
