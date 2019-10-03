const router = require('express').Router()

router.use('/objectives', require('./objectives'))

router.use('/maps', require('./maps'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
