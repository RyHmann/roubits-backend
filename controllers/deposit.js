const depositRouter = require('express').Router()
const Ledger = require('../models/ledger')
const userExtractor = require('../utils/middleware').userExtractor
const User = require('../models/user')

depositRouter.post('/:id', userExtractor, async (request, response) => {
    const body = request.body
    const user = await User.findById(request.user)
    if (!user) {
        return response.status(403)
    } else {
        const newDeposit = {
            id: body.id,
            amount: body.value
        }
        const previousLedger = await Ledger.findOne({ user: user.id }).sort({ lastUpdated: -1 }).limit(1)
        const previousBalance = previousLedger?.value || 0
        const newValue = previousBalance + newDeposit.amount

        const newLedgerItem = new Ledger({
            value: newValue,
            lastTransaction: newDeposit,
            user: user.id,
        })
        newLedgerItem.lastUpdated = new Date()

        const savedLedger = await newLedgerItem.save()
        response.status(201).json(savedLedger)
    }
})

module.exports = depositRouter