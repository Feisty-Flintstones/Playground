const router = require('express').Router()
const {Objective} = require('../models')

//Get all
router.get('/', async (req, res, next) => {
    try {
        res.json(await Objective.findAll())
    } catch (error) {
        next(error)
    }
})

//Get one objective
router.get('/:id', async (req, res, next) => {
    try {
        res.json(await Objective.findOne({
            where: {
                id: req.body.id
            }
        }))
    } catch (error) {
        next(error)
    }
})