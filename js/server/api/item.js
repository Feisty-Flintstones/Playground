const router = require('express').Router()
const {item} = require('../models')

//Get all
router.get('/', async (req, res, next) => {
    try {
        res.json(await item.findAll())
    } catch (error) {
        next(error)
    }
})

module.exports = router