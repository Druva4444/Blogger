import express from 'express';
const Router = express.Router();
import { createBlog, deleteBlog, getBlogs, getDrafts } from '../controllers/blog.controller.js';
import { checkauth } from '../middleware/auth.middleware.js';
Router.post('/create', checkauth, createBlog);
Router.get('/get', checkauth, getBlogs);
Router.get('/drafts', checkauth, getDrafts);
Router.delete('/delete/:id',checkauth,deleteBlog)
export default Router;