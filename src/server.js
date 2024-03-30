import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from '../src/config/database.js'
import userRouter from './api/routes/user.route.js'
import postRouter from './api/routes/post.route.js'
import commentRouter from './api/routes/comment.route.js'
import authRouter from './auth/authentication.js'

dotenv.config({
    path:"./.env",
});

// const PORT = 3000;
const app = express()


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello from backend");
})

// connectDB().then(() => 
//     console.log("mongodb connected!!!")
// );

app.use('/',userRouter)
app.use('/',postRouter)
app.use('/',commentRouter)
app.use('/',authRouter)


const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    
    console.log(`server started at http://localhost:${PORT}`);
})