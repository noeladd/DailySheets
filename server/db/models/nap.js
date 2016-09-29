'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('nap', {
    start: {
        type: Sequelize.STRING
    },
    end: {
        type: Sequelize.STRING
    },
    notes: {
        type: Sequelize.TEXT
    }
})
