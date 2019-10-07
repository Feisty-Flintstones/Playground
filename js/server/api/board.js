const router = require('express').Router()
const {Board} = require('../models')

//Get all
router.get('/', async (req, res, next) => {
    try { // keep await outside of res.json. might end up sending back an error instead of catching it
        res.json(await Board.findAll())
    } catch (error) {
        next(error)
    }
})

//Load a board from the database
router.get('/:id', async (req, res, next) => {
    try {
        res.json(await Board.findOne({
            where: {
                id: req.body.id
            }
        }))
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