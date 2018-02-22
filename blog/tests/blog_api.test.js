const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].title).toBe('String')
})

afterAll(() => {
  server.close()
})