const User = require('../../models/user.model');
const Course = require('../../models/course.model');

getList = async (req, res) => {
    try {
        const teacherList = await User.find({role: 'USER_TEACHER'});
        return res.status(200).send(teacherList);
    } catch (e) {
        return res.status(500).send({message: 'Error'});
    }
}

create = async (req, res) => {
    try {
        const {name, email, password, birthDay, location, major, imgUrl} = req.body;
        const userFind = await User.find({email: email});
        if (userFind.length) {
            return res.status(500).send({message: 'Duplicate email'});
        }
        const user = new User(
            {
                name: name,
                email: email,
                role: 'USER_TEACHER',
                password: password,
                birthDay: birthDay,
                location: location,
                major: major,
                imgUrl: imgUrl,
                status: false
            }
        );
        user.authorities.push(user.role);
        await user.save();
        return res.status(200).send({message: 'Success'});

    } catch (e) {
        return res.status(500).send({message: 'Create fail'});
    }
}
getDetail = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.query.id})
        if (user) {
            return res.status(200).send(user);
        }
        return res.status(500).send({message: 'Not fount teacher'})
    } catch (e) {
        return res.status(500).send({message: 'System error'})
    }
}
deleteTeacher = async  (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.id})
        if (user) {
            if (user.status === false) {
                await User.deleteOne({_id: req.body.id});
                return res.status(200).send({message: 'Delete success'});
            } else {
                return res.status(500).send({message: 'Can not delete teacher'});
            }
        } else {
            return res.status(500).send({message: 'Not found teacher'});
        }
    } catch (e) {
        return res.status(500).send({message: 'System error'})
    }
}
getTeacherByMajor = async (req, res) => {
    try {
        const user = await User.find({major: req.query.major, role: req.query.role});
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(200).send([]);
        }
    } catch (e) {
        return res.status(500).send({message: 'System error'})
    }
}
module.exports = {
    getList,
    create,
    getDetail,
    deleteTeacher,
    getTeacherByMajor
}
