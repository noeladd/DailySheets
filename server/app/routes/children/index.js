'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db')
const Child = db.model('child')
const Day = db.model('day')
const Classroom = db.model('classroom')
const Checkin = db.model('checkin')
const User = db.model('user')

router.post('/', function(req, res,next){
    Child.create(req.body)
    .then(function(createdChild){
        res.status(201).json(createdChild)
    })
})

router.get('/', function( req, res, next){
    Child.findAll()
    .then(function(children){
        res.json(children);
    })
    .catch(next)
});

router.param('id', function(req, res, next, id){
    Child.findById(id, {include: [
        {model: Day},
        {model: User, as: 'parent'},
        {model: Classroom},
        {model: Checkin}
    ]})
    .then(function (child){
        if (!child) res.status(404).send();
        req.childById = child;
        next();
    })
    .catch(next);
})

router.get('/:id', function(req, res, next){
    res.send(req.childById);
});
