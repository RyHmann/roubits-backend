const Ledger = require('../models/ledger')
const ledgersRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const User = require('../models/user')

ledgersRouter.get('/', async (request, response) => {
    const ledgers = await Ledger.find({})
    response.json(ledgers)
})

ledgersRouter.post('/', userExtractor, async (request, response) => {
    const user = await User.findById(request.user)
    if (user) {
        const newLedger = new Ledger({
            value: 0,
            lastTransaction: null,
            user: user.id
        })
        newLedger.lastUpdated = new Date()
        const savedLedger = await newLedger.save()
        response.status(201).json(savedLedger)
    } else {
        response.status(400).json({ error: 'could not find user to assign ledger to' })
    }
})

ledgersRouter.delete('/:id', async (request, response) => {
    const ledger = await Ledger.findById(request.params.id)
    if (!ledger) {
        return response.status(404).json({ error: 'could not find ledger to delete' })
    } else {
        await Ledger.findByIdAndRemove(request.params.id)
        response.json(204).end()
    }
})

module.exports = ledgersRouter