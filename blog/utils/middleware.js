const jwt = require('jsonwebtoken')


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  console.log("author" + authorization)

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  tokenExtractor
}