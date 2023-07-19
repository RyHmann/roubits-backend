const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    user: String,
    passwordHash: String,
    routines: [
        {
            id: String,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Routine'
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