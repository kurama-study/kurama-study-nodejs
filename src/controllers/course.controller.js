const Course = require('../models/course.model');
const User = require('../models/user.model');
const create = async function (req, res) {
    const course = new Course(req.body);
    course.code = new Date().getTime();
    await course.save();
    res.send(course);
}
const getList = async function (req, res) {
   const courses = await Course.find({})
   if (courses !== null || courses || courses === []) {
     return  res.status(200).send(courses);
   }
   return res.status(500).send('error')
}

const findById = async function (req, res) {
    const course = await Course.findOne({"_id": req.body.id})
    if (course !=null) {
        const teacher = await User.findOne({"_id": course.teacher});
        course.teacher = {
            name: teacher.username,
            email: teacher.email
        }
        return res.status(200).send(course);
    }
    return res.status(500).send('error');
}
const registerCourse = async function (req, res) {
    try {
        const course = await Course.findOne({"_id": req.body.course});
        const user = await User.findOne({"_id": req.body.user});
        if (course !=null && user != null) {
            course.user.user_id = user._id;
            user.courses.push(course);
            course.save();
            user.save();
            return res.status(200).send(user.courses);
        }
        return res.status(500).send('error');
    } catch (e) {
        res.status(500).send(e);
    }

}


module.exports = {
    create,
    getList,
    findById,
    registerCourse
}
