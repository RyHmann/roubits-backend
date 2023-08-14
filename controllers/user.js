const User = require('../models/user')
const Ledger = require('../models/ledger')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.get('/:id/routines', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
            .populate({
                path: 'routines',
                populate: {
                    path: 'habits',
                    model: 'Habit'
                }
            })
            .populate('rewards', { namne: 1, value: 1 })
        response.json(user.routines)
    } catch (error) {
        console.log(error.message)
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const { name, username, password } = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            name,
            username,
            passwordHash
        })
        const savedUser = await user.save()
        if (savedUser) {
            const newLedger = new Ledger({
                value: 0,
                lastTransaction: null,
                user: user.id
            })
            newLedger.lastUpdated = new Date()
            await newLedger.save()
            response.status(201).json(savedUser)
        }
    } catch (error) {
        console.log(error.message)
        response.status(400).json(error.message)
    }

})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = usersRouter