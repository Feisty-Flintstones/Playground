const router = require('express').Router()

// router.use('/objective', require('./objective'))
router.use('/item', require('./item'))
router.use('/board', require('./board'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
