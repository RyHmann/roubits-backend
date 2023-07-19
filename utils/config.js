require('dotenv').config()

const PORT = process.env.PORT
const dbURI = process.env.MONGODB_URI

module.exports = {
    PORT,
    dbURI
}