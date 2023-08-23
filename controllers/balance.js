const balanceRouter = require('express').Router()
const Ledger = require('../models/ledger')
const userExtractor = require('../utils/middleware').userExtractor
const User = require('../models/user')

balanceRouter.get('/:id', userExtractor, async (request, response) => {
    const user = await User.findById(request.user)
    if (!user) {
        return response.status(403)
    } else {
        const latestLedger = await Ledger.findOne({ user: user.id }).sort({ lastUpdated: -1 }).limit(1)
        response.json(latestLedger)
    }
})

module.exports = balanceRouter