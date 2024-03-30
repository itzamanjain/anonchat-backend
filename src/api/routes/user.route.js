import express from 'express'


const router = express.Router()
import verifyUser from '../controllers/users/verifyUser'
import userInfo from '../controllers/users/userInfo'
import verifyToken from '../../auth/auth-middleware'
import { publishFeedback } from '../controllers/users/feedback'
import { userBookMarks, fetchBookMarkedUsers, fetchUserBookmarkedPosts } from '../controllers/users/bookmarks'  
import { saveTopic } from '../controllers/users/topicFollow'
import { userPostsInfo,editProfile } from '../controllers/users/profile'

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