import express from 'express'
const router = express.Router() 
import register from '../api/controllers/users/register.js'
import login from '../api/controllers/users/login.js'


router.post('/register',register)
router.post('/login',login)

export default  router 