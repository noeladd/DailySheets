'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db');
const Message = db.model('message');
const User = db.model('user');

router.get('/:id', function(req, res, next){
    Message.findById(req.params.id)
    .then(function(message){
        res.json(message);
    })
    .catch(next);
})
router.get('/to/:id', function(req, res, next){
    Message.findAll({
        where: {
            toId: req.params.id
        },
        include: [
            {model: User, as: 'to'},
            {model: User, as: 'from'}
        ]
    })
    .then(function (messages) {
        res.json(messages);
    })
    .catch(next);
});

router.get('/from/:id', function(req, res, next){
    Message.findAll({
        where: {
            fromId: req.params.id
        },
        include: [
            {model: User, as: 'from'},
            {model: User, as: 'to'}
        ]
    })
    .then(function(messages){
        res.json(messages);
    })
    .catch(next);
})
