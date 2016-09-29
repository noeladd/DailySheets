'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('meal', {
    time: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM('breakfast', 'lunch', 'snack') // eslint-disable-line new-cap
    },
    food: {
        type: Sequelize.ARRAY(Sequelize.TEXT) // eslint-disable-line new-cap
    },
    notes: {
        type: Sequelize.TEXT
    }
})
