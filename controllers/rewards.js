const rewardsRouter = require('express').Router()
const Reward = require('../models/reward')
const userExtractor = require('../utils/middleware').userExtractor
const User = require('../models/user')


rewardsRouter.get('/', async (request, response) => {
    const rewards = await Reward.find({})
    response.json(rewards)
})

rewardsRouter.post('/', userExtractor, async (request, response) => {
    const { name, value } = request.body
    const user = await User.findById(request.user)
    if (user) {
        const newReward = new Reward ({
            name: name,
            value: value,
            user: user.id
        })
        const savedReward = await newReward.save()
        user.rewards = user.rewards.concat(savedReward._id)
        await user.save()
        response.status(201).json(savedReward)
    } else {
        response.status(400).json({ error: 'could not find user to assign reward to' })
    }
})

rewardsRouter.delete('/:id', async (request, response) => {
    const reward = await Reward.findById(request.params.id)
    if (!reward) {
        return response.status(404).json({ error: 'could not find reward to delete' })
    } else {
        await Reward.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
})

module.exports = rewardsRouter