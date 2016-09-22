'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db');
const User = db.model('user');
const Classroom = db.model('classroom');


router.get('/staff', function( req, res, next){
    User.findAll({$or: [{isTeacher: true }, {isAdmin: true}]})
    .then(function(teachers){
        res.json(teachers);
    })
    .catch(next)
});

router.get('/parents', function(req, res, next){
    User.findAll({where: {isParent: true}})
    .then(function(parents){
        res.json(parents);
    })
    .catch(next)
})

router.param('id', function(req, res, next, id){
    User.findById(id, {include: [
        {model: Classroom}
    ]})
    .then(function(teacher){
        if(!teacher) res.status(404).send();
        req.teacherById = teacher;
        next()
    })
    .catch(next)
});

router.get('/:id', function(req, res, next){
    res.send(req.teacherById);
});