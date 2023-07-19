const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.get('/:id/routines', async (request, response) => {
    try {
        const user = await User.findById(request.params.id).populate('routines', { name: 1, habits: 1 })
        response.json(user.routines)
    } catch (error) {
        console.log(error.message)
    }

})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        name,
        username,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = usersRouter