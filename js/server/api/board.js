const router = require('express').Router()
const {Board} = require('../models')
const BoardObjective = require('../models/boardObjective')

//Get all
router.get('/', async (req, res, next) => {
    try {
        const boards = await Board.findAll()
        res.json(boards)
    } catch (error) {
        next(error)
    }
})

//Load a board from the database
router.get('/:id', async (req, res, next) => {
    try {
        let board = await Board.findByPk(req.params.id);
        const data = await BoardObjective.loadBoard(board);
        console.log(data)
        res.send(data)
    } catch (error) {
        next(error)
    }
})

//Save a board to the database
router.post('/:id', async (req, res ,next) => {
    try {
        res.json(await Board.create({
            where: {
                id: req.body.id
            }
        }))
    } catch (error) {
        next(error)
    }
})

module.exports = router