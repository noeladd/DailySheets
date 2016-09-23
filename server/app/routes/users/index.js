'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
const db = require('../../../db');
const User = db.model('user');



router.get('/staff', function( req, res, next){
    User.findAll({where: {isParent: false}}
    )
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
