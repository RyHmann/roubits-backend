const Routine = require('../models/routine')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor
const routinesRouter = require('express').Router()

routinesRouter.get('/', async (request, response) => {
    const routines = await Routine.find({}).populate('habits', { name: 1, value: 1 })
    console.log('routines', routines)
    response.json(routines)
})

routinesRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = await User.findById(request.user)
    console.log('user ', request.user)
    if (user) {
        const newRoutine = new Routine ({
            name: body.name,
            user: user.id
        })
        const savedRoutine = await newRoutine.save()
        user.routines = user.routines.concat(savedRoutine._id)
        await user.save()
        response.status(201).json(savedRoutine)
    } else {
        response.status(400).json({ error: 'could not find user to assign routine to' })
    }
})

routinesRouter.delete('/:id', async (request, response) => {
    const routine = await Routine.findById(request.params.id)
    if (!routine) {
        return response.status(404).json({ error: 'could not find routine to delete' })
    } else {
        await Routine.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
})

module.exports = routinesRouter