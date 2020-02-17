const express = require('express');
const {
    getNewFeeds,
    getAllNewFeeds,
    createNewFeed,
    updateNewFeed,
    deleteNewFeed
} = require('../controllers/newsfeed.controller');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
    .route('/')
    .get(protect, getAllNewFeeds)
    .post(protect, authorize('admin'),createNewFeed);

router
    .route('/:id')
    .get(protect, getNewFeeds)
    .put(protect, authorize('admin'),updateNewFeed)
    .delete(protect, authorize('admin'),deleteNewFeed);

module.exports = router;