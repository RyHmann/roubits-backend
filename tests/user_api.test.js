/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

let testUser
let token = ''

beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('test', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
    testUser = user
    const response = await api.post('/api/login')
        .send({ username: 'root', password: 'test' })
    token = response.body.token
})

describe('User CRUD', () => {

    test('a user can be created', async () => {
        const userName = 'test'
        const password = 'password123'
        const savedUser = await api.post('/api/users')
            .send({ username: userName, password: password })
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const fetchedUser = await User.findOne({ username: userName })
        expect(fetchedUser.username).toEqual(userName)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})