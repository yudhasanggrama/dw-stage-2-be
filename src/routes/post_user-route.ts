import express from "express";
import { getPosts, createPosts, deletePosts, editPosts, detailPosts } from "../controllers/post-controller";
import { createUser, deleteUser, detailUser, getUsers, updateUser } from "../controllers/user.controller";

const router = express.Router()

// Route untuk post
router.get('/posts', getPosts)
router.get('/posts/:id', detailPosts)
router.post('/posts', createPosts)
router.patch('/posts/:id', editPosts)
router.delete('/posts/:id', deletePosts)

// Route untuk user
router.get('/users', getUsers)
router.get('/users/:id', detailUser)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router