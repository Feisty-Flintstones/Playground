const Sequelize = require('sequelize')
const db = require('../db')

const Objective = db.define('objective', {
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

Objective.parseData = function(body) { //possibly useful to change Viroreact stuff into db stuff
    const dbinstances = {
        name: body.name,
        type: body.type,
        coordinates: body.coordinates,
        imageUrl: body.imageUrl
    }
    return dbinstances
}

module.exports = Objective