const Document = require('../../models/document.model');

const createDocument = async (req, res) =>{
    try {
        const documentSave = new Document(req.body);
        await documentSave.save();
        return res.status(200).send({message: 'Create success'});
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}

const getListDocument = async (req, res) => {
    try {
        const documentList = await Document.find({course: req.body.course});
        return res.status(200).send(documentList);
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}
const deleteDocument = async (req, res) => {
    try {
        await Document.deleteOne({_id: req.body.id});
        return res.status(200).send({message: 'Delete success'});
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}

module.exports = {
    createDocument,
    getListDocument,
    deleteDocument
}
