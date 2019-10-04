const Sequelize = require('sequelize')
const db = require('../db')

const Objects = db.define('objects', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

Objectives.parseData = function(body) { //possibly useful to change Viroreact stuff into db stuff
    const dbinstances = {
        name: body.name,
        imageUrl: body.imageUrl
    }
    return dbinstances
}

module.exports = Objects