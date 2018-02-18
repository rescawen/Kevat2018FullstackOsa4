const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = 'mongodb://wenlei:123456@ds141028.mlab.com:41028/blog_db'

mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})