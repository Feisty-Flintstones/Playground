const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 8080
const db = require('./db')
module.exports = app

const createApp = () => {

    app.use(morgan('dev'))

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    app.use('/api', require('./api'))
}

const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
    )
}

const syncDb = () => db.sync()

async function bootApp() {
    await syncDb()
    await createApp()
    await startListening()
}

bootApp()