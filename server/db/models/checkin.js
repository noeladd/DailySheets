'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('checkin', {
    lastFed: {
       type: Sequelize.STRING
    },
    wokeUp: {
        type: Sequelize.STRING
    },
    lastChanged: {
        type: Sequelize.STRING
    },
    note: {
        type: Sequelize.TEXT
    }
})
