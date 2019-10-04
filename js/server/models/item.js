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
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

Item.parseData = function(body) { //possibly useful to change Viroreact stuff into db stuff
    const dbinstances = {
        name: body.name,
        imageUrl: body.imageUrl
    }
    return dbinstances
}

module.exports = Item