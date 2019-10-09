const Sequelize = require('sequelize')
const db = require('../db')
const {Item} = require('./index')
const BoardObjective = require('./boardObjective')

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

//this function loads a created board from the database
// Board.prototype.loadBoard = async function() {
//     try {
//     let playgroundBoard = {name: this.dataValues.name, totem: this.dataValues.totem, objectives: []}
//     const thisId = this.dataValues.id
//     const objectivesInBoard = await BoardObjective.findAll({ //coords, type, itemId
//         where: {
//             boardId: thisId
//         }
//     })
//     for (let i = 0; i < objectivesInBoard.length; i++){ //id, name, source, resources
//         const item = await Item.findByPk(objectivesInBoard[i].itemId)
//         let instance = {...item, ...objectivesInBoard[i]}
//         console.log("INSTANCE:", instance)
//         playgroundBoard.objectives.push(instance)
//     }
//     console.log("PLAYGROUNDBOARD", playgroundBoard)
//     return playgroundBoard
//     } catch (error) {
//         console.log(`ERROR: ${error}`)
//     }
// }

module.exports = Board