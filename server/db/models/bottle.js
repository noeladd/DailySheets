'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('bottle', {
    time: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM('formula', 'breast milk') // eslint-disable-line new-cap
    },
    ounces: {
        type: Sequelize.INTEGER
    },
    notes: {
        type: Sequelize.TEXT
    }
})
