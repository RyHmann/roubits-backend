const mongoose = require('mongoose')

const rewardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    user: {
        id: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

rewardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Reward', rewardSchema)