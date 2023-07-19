const mongoose = require('mongoose')

const routineSchema = new mongoose.Schema({
    name: String,
    user: {
        id: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    habits: [
        {
            id: String,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habit'
        }
    ]
})

routineSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Routine', routineSchema)