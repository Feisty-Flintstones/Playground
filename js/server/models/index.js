const Objective = require('./objective')
const Item = require('./item')
const Board = require('./board')
const BoardObjective = require('./boardObjective')

//ASSOCIATIONS
Objective.belongsToMany(Board, {
    through: BoardObjective
})
Board.belongsToMany(Objective, {
    through: BoardObjective
})

module.exports = {
    Objective,
    Item,
    Board,
    BoardObjective
}