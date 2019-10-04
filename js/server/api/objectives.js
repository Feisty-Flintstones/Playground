const router = require('express').Router()
const {Objectives} = require('../models')

router.get('/', async (req, res, next) => {
    try {
        res.json(await Objectives.findAll())
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await Objectives.findOne({
            where: {
                id: req.body.id
            }
        }))
    } catch (error) {
        next(error)
    }
})