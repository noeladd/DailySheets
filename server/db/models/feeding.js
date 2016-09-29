'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('feeding', {
    time: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM('formula', 'breast milk')
    },
    ounces: {
        type: Sequelize.INTEGER
    },
    notes: {
        type: Sequelize.TEXT
    }
})