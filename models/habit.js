const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
    name: String,
    value: Number,
    isPositive: Boolean,
    routine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Routine'
    } 
})

habitSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Habit', habitSchema)