const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    value: Number,
    lastUpdated: Date,
    lastTransaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }
})

ledgerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Ledger', ledgerSchema)