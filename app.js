const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const habitsRouter = require('./controllers/habits')
const routinesRouter = require('./controllers/routines')
const ledgersRouter = require('./controllers/ledgers')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect(config.dbURI)
    .then(() => {
        logger.info('Connected to database')
    })
    .catch((error) => {
        logger.info('Error connecting to database: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/habits', habitsRouter)
app.use('/api/routines', routinesRouter)
app.use('/api/ledgers', ledgersRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)

module.exports = app