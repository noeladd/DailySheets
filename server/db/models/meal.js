'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('meal', {
    time: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM('breakfast', 'lunch', 'snack')
    },
    food: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    notes: {
        type: Sequelize.TEXT
    }
})
