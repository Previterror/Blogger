import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { Blog } from "../models/Blog.js"
import { api } from "./AxiosService.js"


class BlogsService {
    async destroyPost(blogId) {
        const response = await api.delete(`api/blogs/${blogId}`)
        console.log(response.data)
        const blogIndex = AppState.blogs.findIndex(blog => blogId == blog.id)
        AppState.blogs.splice(blogIndex, 1)
    }

    async createBlogPost(value) {
        const response = await api.post(`api/blogs`, value)
        console.log("posted blog ", response.data)
    }

    async getProfileById(profileId) {
        AppState.activeProfile = null
        const response = await api.get(`api/profiles/${profileId}`)
        console.log(response.data)
        const profile = new Account(response.data)
        AppState.activeProfile = profile
    }
    setActiveBlogPost(blogId) {
        AppState.activeBlog = null
        let blogToSet = AppState.blogs.find(blog => blog.id == blogId)
        console.log(blogId)
        AppState.activeBlog = blogToSet
    }

    async getBlogById(blogId) {
        const response = await api.get(`api/blogs/${blogId}`)
        console.log(response.data)
        const blog = new Blog(response.data)
        AppState.activeBlog = blog
    }

    async getBlogPosts() {
        const response = await api.get('api/blogs')
        console.log(response.data)
        const blogs = response.data.map(blog => new Blog(blog))
        AppState.blogs = blogs
    }

}

export const blogsService = new BlogsService