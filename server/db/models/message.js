'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('message', {
    subject: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    }
})
