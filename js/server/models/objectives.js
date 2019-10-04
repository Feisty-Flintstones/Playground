const Sequelize = require('sequelize')
const db = require('../db')

const Objectives = db.define('objectives', {
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
        type: body.type,
        coordinates: body.coordinates,
        imageUrl: body.imageUrl
    }
    return dbinstances
}

module.exports = Objectives