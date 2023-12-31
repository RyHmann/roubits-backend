const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    value: Number,
    lastUpdated: Date,
    lastTransaction: {
        id: String,
        amount: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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