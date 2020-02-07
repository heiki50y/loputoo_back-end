const express = require('express');
const {
    getStudentDoc,
    getAllStudentDoc,
    createStudentDoc,
    updateStudentDoc,
    deleteStudentDoc
} = require('../controllers/studentdoc.controller');

const {
    getCompanyDoc,
    getAllCompanyDoc,
    createCompanyDoc,
    updateCompanyDoc,
    deleteCompanyDoc
} = require('../controllers/practicedoc.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');


router
    .route('/student')
    .get(getAllStudentDoc)
    .post(protect, authorize('student'), createStudentDoc);

router
    .route('/student/:id')
    .get(getStudentDoc)
    .put(updateStudentDoc)
    .delete(deleteStudentDoc);

router
    .route('/company')
    .get(getAllCompanyDoc)
    .post(createCompanyDoc);

router
    .route('/company/:id')
    .get(getCompanyDoc)
    .put(updateCompanyDoc)
    .delete(deleteCompanyDoc);

module.exports = router;