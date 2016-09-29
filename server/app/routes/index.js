'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/children', require('./children'));
router.use('/days', require('./days'));
router.use('/messages', require('./messages'));
router.use('/checkins', require('./checkin'));
router.use('/classrooms', require('./classrooms'));
// Make sure this is after all of
// the registered routes!
router.use(function (req, res, next) {
    var err = new Error('Not found.');
    err.status = 404;
    next(err);
});
