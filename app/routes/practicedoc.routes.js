const express = require('express');
const {
    findAllDoc,
    findOneDoc,
    createDoc,
    updateDoc,
    deleteDoc
} = require('../controllers/practicedoc.controller');

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