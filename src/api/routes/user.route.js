import express from 'express'


const router = express.Router()
import verifyUser from '../controllers/users/verifyUser'
import userInfo from '../controllers/users/userInfo'
import verifyToken from '../../auth/auth-middleware'

router.post('/api/verification',verifyUser)
router.get('/api/user',verifyToken,userInfo)


export default router