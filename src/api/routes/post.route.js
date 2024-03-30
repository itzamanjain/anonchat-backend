import express from 'express';
import verifyToken from '../../auth/auth-middleware.js'
import { publishPost } from '../controllers/posts/create.js';
import { editPost } from '../controllers/posts/update.js';
import {deletePost} from '../controllers/posts/delete.js'
import { saveUpvotes,fetchUpvotes } from '../controllers/posts/upvote.js';
import { fetchPost, fetchPostDetails } from '../controllers/posts/fetch.js';
import { searchPosts } from '../controllers/posts/search.js';
import { calculatePostViews } from '../controllers/posts/views.js';

const router = express.Router();

router.post('/post',verifyToken,publishPost)
router.get('/api/posts',verifyToken,fetchPost)
router.get('/api/post/:id',verifyToken,fetchPostDetails)
router.post('/api/post/edit/:postid',verifyToken,editPost)
router.delete('/api/post/delete/:postid',verifyToken,deletePost)


// upvote on post 

router.post('/api/post/upvote/:postid',verifyToken,saveUpvotes)
router.get('/api/post/upvote/:postid',verifyToken,fetchUpvotes)

router.get('/api/searchpost/:searchQuery',searchPosts)

//views
router.put('/api/post/:id/view',verifyToken,calculatePostViews)

export default router;