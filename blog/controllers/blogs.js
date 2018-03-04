const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({})
  .populate('user', { username: 1, name: 1 } )
  response.json(blogs.map(Blog.format))
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    console.log(blog)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    console.log(user)

    if (!!blog.user) {
      if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
  
        response.status(204).end()
      } else {
        response.status(400).send({ error: 'user id does not match' })
      }
    } else {
      await Blog.findByIdAndRemove(request.params.id)
  
        response.status(204).end()
    }

    

    
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    // const token = getTokenFrom(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined) {
      return response.status(400).json({ error: 'title missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(blog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes } , {new: true})
  
  response.send(blog)
})

module.exports = blogsRouter