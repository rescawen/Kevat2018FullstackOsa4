const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 1
  },
  {
    title: 'String2',
    author: 'String2',
    url: 'String2',
    likes: 2
  }
]

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  console.log(response.body)
  
  console.log(initialBlogs)

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api
    .get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain('String2')
})


test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
    author: 'String3',
    url: 'String3',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua')
})

afterAll(() => {
  server.close()
})