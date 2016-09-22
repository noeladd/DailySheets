'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('day', {
    date: {
       type: Sequelize.STRING
    }
})
