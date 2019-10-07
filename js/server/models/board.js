const Sequelize = require('sequelize')
const db = require('../db')

const Board = db.define('board', {
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

//after a User creates a board in the SandBox, this function saves the created board in the database
// Not sure this would work the way it currently is. Look at how you're handling the boardObjectives
Board.prototype.saveBoard = async function(objsInBoard) {
    let boardObjectives = []
    for(let idx = 0; idx < objsInBoard.length; idx++) {
        const objective = {
            mapId: this.id,
            objectiveId: objsInBoard[i].id,
            coordinates: objsInBoard[i].coordinates,
            type: objsInBoard[i].type
        }
        boardObjectives.push(await boardObjectives.create(objective))
    }
    return boardObjectives
}

module.exports = Board