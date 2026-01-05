import { Request, Response } from "express";
import { Post, posts } from "../models/post-model";

export const getPosts = (req:Request, res:Response)=> {
    res.json(posts)
}

export const createPosts = (req:Request, res:Response)=> {
    const {title, content} = req.body

    const newPost:Post={
        id:posts.length + 1,
        title,
        content
    }

    posts.push(newPost)
    res.status(201).json(newPost)
}

export const deletePosts = (req:Request, res:Response)=> {
    const {id} = req.params

    const dataIndex = posts.findIndex(item => item.id === parseInt(id))

    
    if (dataIndex === -1) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    posts.splice(dataIndex, 1); 
    res.status(200).json(posts);
}