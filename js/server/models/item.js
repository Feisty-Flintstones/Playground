const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    resources: {
        type: Sequelize.STRING,
    },
    is3D: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

Item.parseData = function(body) { //possibly useful to change Viroreact stuff into db stuff
    const dbinstances = {
        name: body.name,
        imageUrl: body.imageUrl,
        source: body.source,
        resources: body.resources,
        is3D: body.is3D
    }
    return dbinstances
}

module.exports = Item