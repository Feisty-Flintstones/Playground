const Sequelize = require('sequelize')
const db = require('../db') 

const Board = db.define('board', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncremenet: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    totem: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})
module.exports = Board