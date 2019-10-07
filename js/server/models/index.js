const db = require('../')
const Item = require('./item')
const Board = require('./board')
const BoardObjective = require('./boardObjective')

//ASSOCIATIONS
Item.belongsToMany(Board, {
    through: BoardObjective
})
Board.belongsToMany(Item, {
    through: BoardObjective
})

module.exports = {
    db,
    Item,
    Board,
    BoardObjective
}