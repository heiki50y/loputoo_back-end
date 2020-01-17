const express = require('express');
const {
    findOneDoc,
    findAllDoc,
    createDoc,
    updateDoc,
    deleteDoc
} = require('../controllers/studentdoc.controller');

const router = express.Router();

router
    .route('/')
    .get(findAllDoc)
    .post(createDoc);

router
    .route('/:id')
    .get(findOneDoc)
    .put(updateDoc)
    .delete(deleteDoc);

module.exports = router;