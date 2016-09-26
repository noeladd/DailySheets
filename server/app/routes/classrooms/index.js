'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db');
const Classroom = db.model('classroom');
const User = db.model('user');
const Child = db.model('child');

router.post('/', function(req, res, next){
    Classroom.create(req.body)
    .then(function(createdClassroom){
        res.status(201).json(createdClassroom)
    })
    .catch(next)
})

router.get('/', function(req, res, next){
    Classroom.findAll()
    .then(function (classrooms){
        res.json(classrooms);
    })
    .catch(next);
});

router.param('id', function(req, res, next, id){
    Classroom.findById(id, {include: [
        {model: Child},
        {model: User, as: 'teacher'}
    ]}).then(function(classroom){
        if (!classroom) res.status(404).send();
        req.classroomById = classroom;
        next();
    })
    .catch(next);
})

router.get('/:id', function(req, res, next){
    res.send(req.classroomById);
})
