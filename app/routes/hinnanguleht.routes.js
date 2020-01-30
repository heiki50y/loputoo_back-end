const express = require('express');
const {
    getHinnaguleht,
    getAllHinnaguleht,
    createHinnanguleht,
    updateHinnaguleht,
    deleteHinnaguleht
} = require('../controllers/hinnanguleht.controller');

const router = express.Router();

router
    .route('/')
    .get(getAllHinnaguleht)
    .post(createHinnanguleht);

router
    .route('/:id')
    .get(getHinnaguleht)
    .put(updateHinnaguleht)
    .delete(deleteHinnaguleht);

module.exports = router;