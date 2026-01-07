import express from "express";
import { getPosts, createPosts, deletePosts, editPosts, detailPosts, getSummary } from "../controllers/post-controller";
import { createUser, deleteUser, detailUser, getUsers, updateUser } from "../controllers/user.controller";
import { commentSummary, getComments } from "../controllers/comment-controller";

const router = express.Router()

// Route untuk post
// 🔥 ROUTE KHUSUS / STATIS DULU
router.get('/posts/comments-summary', getSummary)
router.get('/posts/comment-summary', commentSummary)
// SUB-RESOURCE DULU
router.get('/posts/:id/comments', getComments)
// LIST & CREATE
router.get('/posts', getPosts)
router.post('/posts', createPosts)
// DETAIL / UPDATE / DELETE
router.get('/posts/:id', detailPosts)
router.patch('/posts/:id', editPosts)
router.delete('/posts/:id', deletePosts)

// Route untuk user
router.get('/users', getUsers)
router.get('/users/:id', detailUser)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router