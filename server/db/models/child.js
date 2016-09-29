'use strict';

const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('child', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthdate: {
        type: Sequelize.DATE
    },
    picture: {
        type: Sequelize.STRING
    }
})