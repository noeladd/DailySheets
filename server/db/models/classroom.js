'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('classroom', {
    name: {
        type: Sequelize.STRING
    },
    ageRange: {
        type: Sequelize.STRING
    }
})
