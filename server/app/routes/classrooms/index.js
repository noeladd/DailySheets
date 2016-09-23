'use strict';
const router = require('express').Router(); //eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db');
const Classroom = db.model('classroom');
const User = db.model('user');
const Child = db.model('child');

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
        {mode: User, as: 'teacher'}
    ]}).then(function(classroom){
        if (!classroom) res.status(404).send();
        req.ClassroomBy.Id = classroom;
        next();
    })
    .catch(next);
})

router.get('/:id', function(req, res, next){
    res.send(req.classroomById);
})
