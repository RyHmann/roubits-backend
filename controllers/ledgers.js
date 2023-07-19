const Ledger = require('../models/ledger')
const ledgersRouter = require('express').Router()

ledgersRouter.get('/', async (request, response) => {
    const ledgers = await Ledger.find({})
    response.json(ledgers)
})

ledgersRouter.post('/', async (request, response) => {
    const body = request.body

    const newLedger = new Ledger({
        value: body.value,
    })
    newLedger.lastUpdated = new Date()
    const savedLedger = await newLedger.save()
    response.status(201).json(savedLedger)
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