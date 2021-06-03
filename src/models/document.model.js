const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    link: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
    },


})

const Document = mongoose.model('document', documentSchema);
module.exports = Document;
