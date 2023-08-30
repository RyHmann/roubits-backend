const depositRouter = require('express').Router()
const Ledger = require('../models/ledger')
const Habit = require('../models/habit')
const userExtractor = require('../utils/middleware').userExtractor
const User = require('../models/user')

depositRouter.post('/:id', userExtractor, async (request, response) => {
    const body = request.body
    const user = await User.findById(request.params.id)
    if (!user) {
        return response.status(403)
    } else {

        const habit = await Habit.findById(body.id)
        if (!habit)
        {
            return response.status(404).json({ error: 'could not find habit' })
        }
        const newDeposit = {
            id: habit.id,
            value: habit.value
        }

        const previousLedger = await Ledger.findOne({ user: user.id }).sort({ lastUpdated: -1 }).limit(1)
        const previousBalance = previousLedger?.value || 0
        const newValue = previousBalance + newDeposit.value

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