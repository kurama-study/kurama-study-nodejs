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
                user.courses.push({course: course._id, status: false, name: course.name});
               if (course.studentRegistered === course.studentQuantity) {
                    course.status = false;
                }
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
                course.studentRegistered -= 1;
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

module.exports = {
    getList,
    findById,
    register,
    cancel,
    getListCourseRegistered
}
