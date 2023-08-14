const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String,
    routines: [
        {
            id: String,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Routine'
        }
    ],
    rewards: [
        {
            id: String,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reward'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)