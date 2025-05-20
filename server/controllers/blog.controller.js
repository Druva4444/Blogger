import express from 'express';
import  User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import blog from '../models/blog.model.js';
import dotenv from 'dotenv';
dotenv.config();
export async function createBlog(req, res) {
    try {
        const { id, title, content,status } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }
        if (id) {
            const existingBlog = await blog.findById(id);

            if (!existingBlog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            if (existingBlog.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'You are not authorized to update this blog' });
            }

            existingBlog.title = title;
            existingBlog.content = content;
            existingBlog.status = status;
            await existingBlog.save();

            return res.status(200).json({ message: 'Blog updated successfully', blog: existingBlog });
        }
        const duplicate = await blog.findOne({ title });
        if (duplicate) {
            return res.status(400).json({ message: 'Blog already exists with this title' });
        }
        const newBlog = new blog({ title, content, author: req.user._id,status:status });
        await newBlog.save();
        res.status(200).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getBlogs(req,res) {
    try {
        const blogs = await blog.find({author:req.user._id,status:'published'}).populate('author', 'name');
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function getDrafts(req,res) {
    try {
        const blogs = await blog.find({author:req.user._id,status:'draft'}).populate('author', 'name');
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function publishBlog(req,res) {
    try {
        const { id } = req.params;
        const blogToUpdate = await blog.findById(id);
        if (!blogToUpdate) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        blogToUpdate.status = 'published';
        await blogToUpdate.save();
        res.status(200).json({ message: 'Blog published successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function deleteBlog(req,res) {
    try {
        const { id } = req.params;
        const blogToDelete = await blog.findById(id);
        if (!blogToDelete) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await blog.findByIdAndDelete(id);

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}