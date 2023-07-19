const Habit = require('../models/habit')
const Routine = require('../models/routine')
const habitsRouter = require('express').Router()

habitsRouter.get('/', async (request, response) => {
    const habits = await Habit.find({})
    response.json(habits)
})

habitsRouter.post('/', async (request, response) => {
    const body = request.body
    let routine
    try {
        routine = await Routine.findById(body.routine)
    } catch (error) {
        console.log(error)
    }
    
    if (!routine) {
        response.status(409).json({ error: 'a habit must be attached to a valid routine'})
    } else {
        const habit = new Habit({
            name: body.name,
            value: body.value,
            isPositive: body.completed || true,
            routine: routine.id
        })
        const savedHabit = await habit.save()
        routine.habits = routine.habits.concat(savedHabit._id)
        await routine.save()
        response.status(201).json(savedHabit)
    }
})

habitsRouter.delete('/:id', async (request, response) => {
    const habit = await Habit.findById(request.params.id)
    if (!habit) {
        return response.status(404).json({ error: 'could not find habit to delete' })
    } else {
        await Habit.findByIdAndRemove(request.params.id)
        response.json(204).end()
    }
})

module.exports = habitsRouter