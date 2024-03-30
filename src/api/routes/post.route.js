import express from 'express';
import verifyToken from '../../auth/auth-middleware'
import { publishPost } from '../controllers/posts/create';
import { editPost } from '../controllers/posts/update';
import {deletePost} from '../controllers/posts/delete'
import { saveUpvotes,fetchUpvotes } from '../controllers/posts/upvote';
import { fetchPost, fetchPostDetails } from '../controllers/posts/fetch';
import { seachPosts } from '../controllers/posts/search';
import { calculatePostViews } from '../controllers/posts/views';

const router = express.Router();

router.post('/post',verifyToken,publishPost)
router.get('/api/posts',verifyToken,fetchPost)
router.get('/api/post/:id',verifyToken,fetchPostDetails)
router.post('/api/post/edit/:postid',verifyToken,editPost)
router.delete('/api/post/delete/:postid',verifyToken,deletePost)


// upvote on post 

router.post('/api/post/upvote/:postid',verifyToken,saveUpvotes)
router.get('/api/post/upvote/:postid',verifyToken,fetchUpvotes)

router.get('/api/searchpost/:searchQuery',seachPosts)

//views
router.put('/api/post/:id/view',verifyToken,calculatePostViews)

export default router;