const Blog = require('../models/blog')
const User = require('../models/user')

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

const format = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}
const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    initialBlogs, format, nonExistingId, blogsInDb, usersInDb
}