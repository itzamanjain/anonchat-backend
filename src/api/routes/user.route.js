import express from 'express'


const router = express.Router()
import verifyUser from '../controllers/users/verifyUser.js'
import userInfo from '../controllers/users/userInfo.js'
import verifyToken from '../../auth/auth-middleware.js'
import { publishFeedback } from '../controllers/users/feedback.js'
import { userBookMarks, fetchBookMarkedUsers, fetchUserBookmarkedPosts } from '../controllers/users/bookmarks.js'  
import { saveTopic } from '../controllers/users/topicFollow.js'
import { userPostsInfo,editProfile } from '../controllers/users/profile.js'

router.post('/api/verification',verifyUser)
router.get('/api/user',verifyToken,userInfo)
router.get('/api/posts/user/:userId',verifyToken,userPostsInfo)
router.post('/api/profile/edit/:userId',verifyToken,editProfile)   
router.post('/api/user/feedback',verifyToken,publishFeedback)
router.post('/api/user/bookmark/:postid',verifyToken,userBookMarks)
router.get('/api/user/bookmark/:postid',verifyToken,fetchBookMarkedUsers)   
router.get('/api/user/bookmarks',verifyToken,fetchUserBookmarkedPosts)
router.post('/api/user/topics',verifyToken,saveTopic)


export default router