'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('diaper', {
    time: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM('wet', 'dry', 'bowel movement')
    },
    cream: {
        type: Sequelize.BOOLEAN
    },
    notes: {
        type: Sequelize.TEXT
    }
})