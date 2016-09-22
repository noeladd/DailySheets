'use strict'
const router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db');
const Day = db.model('day');
const Diaper = db.model('diaper');
const Feeding = db.model('feeding');
const Nap = db.model('nap');
const Meal = db.model('meal');
const Child =  db.model('child');


router.get('/', function(req, res, next){
    Day.findAll({include: {model: Child}})
    .then(function(days){
        res.json(days);
    })
    .catch(next)
});

router.param('id', function(req, res, next, id){
    Day.findById(id, {include: [
        {model: Diaper},
        {model: Feeding},
        {model: Nap},
        {model: Meal}
        ]})
    .then(function(day){
        if (!day) res.status(404).send();
        req.dayById = day;
        next();
    })
    .catch(next);
})

router.get('/:id', function(req, res, next){
    res.send(req.dayById);
});
