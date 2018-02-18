const mongoose = require('mongoose')

const mongoUrl = 'mongodb://wenlei:123456@ds141028.mlab.com:41028/blog_db'

mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise