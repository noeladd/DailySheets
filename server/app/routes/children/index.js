'use strict';
const router = require('express').Router();
module.exports = router;
const db = require('../../../db')
const Child = db.model('child')
const Day = db.model('day')
const Classroom = db.model('classroom')
const User = db.model('user')


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
        {model: User},
        {model: Classroom}
    ]})
})