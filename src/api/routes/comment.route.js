import express from 'express';

const router = express.Router();
import verifyToken from '../../auth/auth-middleware.js';
import {publishComment} from '../controllers/comments/create.js'
import { deleteComment } from '../controllers/comments/delete.js'
import {fetchComments} from '../controllers/comments/fetch.js'
import {saveCommentUpvotes,fetchCommentUpvotes} from '../controllers/comments/upvote.js'

router.post('/post/comment/',verifyToken,publishComment)
router.get('/comments',fetchComments)
router.post('api/comment/upvoted/:commentid',verifyToken,saveCommentUpvotes)
router.get('api/comment/upvoted/:commentid',fetchCommentUpvotes)
router.delete('api/comment/:commentid',verifyToken,deleteComment)

export default router;