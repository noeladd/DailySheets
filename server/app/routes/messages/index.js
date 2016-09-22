'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db');
const Message = db.model('message');

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