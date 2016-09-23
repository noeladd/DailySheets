'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db');
const Checkin = db.model('checkin');
const User = db.model('user');
const Child = db.model('child');

router.get('/class/:id', function(req, res, next){
    Checkin.findAll({where: {classroomId: req.params.id}})
    .then(function (checkins){
        res.json(checkins);
    })
    .catch(next);
});

router.param('id', function(req, res, next, id){
    Checkin.findById(id, {include: [
        {model: Child},
        {model: User, as: 'parent'}
    ]}).then(function(checkin){
        if (!checkin) res.status(404).send();
        req.checkinById = checkin;
        next();
    })
    .catch(next);
})

router.get('/:id', function(req, res, next){
    res.send(req.checkinById);
})
