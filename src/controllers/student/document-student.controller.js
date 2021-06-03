const Document = require('../../models/document.model');

const getListDocument = async (req, res) => {
    try {
        const documentList = await Document.find({course: req.body.course});
        return res.status(200).send(documentList);
    } catch {
        return res.status(500).send({message: 'System error'});
    }
}

module.exports = {
    getListDocument,
}
