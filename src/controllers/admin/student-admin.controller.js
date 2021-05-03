const Course = require('../../models/course.model');
const User = require('../../models/user.model');
const Calendar = require('../../models/calendar.model');
const create = async (req, res) => {
    try {
        const { name, email, password, birthDay, location, major, imgUrl } = req.body;
        const studentByEmail = await User.findOne({email: email});
        if (studentByEmail) {
            res.status(500).send('The Email was registered');
        } else {
            const user = new User(
                {
                    name: name,
                    email: email,
                    role: 'USER_STUDENT',
                    password: password,
                    birthDay: birthDay,
                    location: location,
                    major: major,
                    imgUrl: imgUrl,
                    status: true
                }
            );
            user.authorities.push(user.role);
            await user.save();
            return res.status(200).send({message: 'Success'});
        }

    } catch (e) {
        res.status(500).send({message: 'error'});
    }

}
const getList = async (req, res) => {
    try {
        const teacherList = await User.find({role: 'USER_STUDENT'});
        return res.status(200).send(teacherList);
    } catch (e) {
        return res.status(500).send({message: 'Error'});
    }
}
module.exports = {
    create,
    getList
}
// const getCourseDetail = async (req, res) => {
//     const course = await Course.findOne({"_id": req.body.id})
//     if (course) {
//         const teacher = await User.findOne({"_id": course.teacher});
//         course.teacher = {
//             name: teacher.username,
//             email: teacher.email
//         }
//         return res.status(200).send(course);
//     }
//     return res.status(500).send({message: 'Not found course'});
// }
