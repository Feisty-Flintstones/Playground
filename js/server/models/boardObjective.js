const Sequelize = require('sequelize')
const db = require('../db')

const BoardObjective = db.define('boardObjective', {
    coordinates: {
        type: Sequelize.ARRAY(Sequelize.INTEGER), //we will avoid floats by calling "1.5" to be "15" in the database
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: Sequelize.ENUM('Click', 'Drag', 'Swipe'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})

module.exports = BoardObjective