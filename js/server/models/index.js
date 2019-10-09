const db = require('../db')
const Item = require('./item')
const Board = require('./board')
const BoardObjective = require('./boardObjective')

//ASSOCIATIONS
Item.belongsToMany(Board, {
    through: BoardObjective
    // as: 'boards',
    // foreignKey: 'itemId',
    // otherKey: 'boardId'
})
Board.belongsToMany(Item, {
    through: BoardObjective
    // as: 'items',
    // foreignKey: 'boardId',
    // otherKey: 'itemId'
})

module.exports = {
    db,
    Item,
    Board,
    BoardObjective
}