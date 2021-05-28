const Course = require('../../models/course.model');


const getListCourse = async (req, res) => {
    try {
        const courseList = await Course.find({teacher: req.body.uid})
        return res.status(200).send(courseList);
    } catch {
        return res.status(500).send({message: 'System error'});
    }


}

module.exports = { getListCourse }
