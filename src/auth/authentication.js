import express from 'express'
const router = express.Router() 
import register from '../api/controllers/users/register'
import login from '../api/controllers/users/login'


router.post('/register',register)
router.post('/login',login)

export { router } 