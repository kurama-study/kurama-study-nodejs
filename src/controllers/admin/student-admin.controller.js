const Course = require('../../models/course.model');
const User = require('../../models/user.model');
const Calendar = require('../../models/calendar.model');
const create = async (req, res) => {
    try {
        const {name, email, password, birthDay, location, major, imgUrl} = req.body;
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
const getListStudentByCourse = async (req, res) => {
    try {
        const {students} = req.body;
        const listStudent = await User.find().where('_id').in(students);
        return res.status(200).send(listStudent);
    } catch {
        return res.status(500).send({message: 'Error'});

    }
}
const cancelCourse = async (req, res) => {
    const {course, user} = req.body;
    const courseSave = await Course.findOne({_id: course});
    const students = [];
    courseSave.students.map(async student => {
        if (student.toString() !== user.toString()) {
            await students.push(student);
        }
    })
    courseSave.students = students;
    await courseSave.save();
    return res.status(200).send({message: 'Success'});
}
const cancelStudent = async (req, res) => {
    try {
        const course = await Course.findOne({_id: req.body.course});
        const user = await User.findOne({_id: req.body.user});
        if (course && user) {
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
        } else {

            return res.status(500).send({message: 'error'});
        }

    } catch {
        return res.status(500).send({message: 'error'});
    }
}
const deleteStudent = async (req, res) => {
    try {
        await User.deleteOne({_id: req.body.id});
        return res.status(200).send({message: 'Delete success'})
    } catch {
        return res.status(500).send({message: 'Error'});
    }
}
const updateStudent = async (req, res) => {
    try {
        const {userUpdate} = req.body;
        const user = await User.findOne({_id: userUpdate._id});
        user.name = userUpdate.name;
        user.email = userUpdate.email;
        user.birthDay = userUpdate.birthDay;
        user.location = userUpdate.location;
        user.major = userUpdate.major;
        user.password = userUpdate.password;
        await user.save();
        return res.status(200).send({message: 'Update success'});
    } catch {
        return res.status(500).send({message: 'Error'});

    }


}
module.exports = {
    create,
    getList,
    getListStudentByCourse,
    cancelCourse,
    cancelStudent,
    deleteStudent,
    updateStudent
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
