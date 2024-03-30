import Post from  '../../models/post.model.js'
import User from '../../models/user.model.js'
import timeSinceCreated from '../../helpers/timestamp-algo.js'
import mongoose from 'mongoose'
import z from 'zod'
const {formatTimeSince} = timeSinceCreated

const userPostsInfo = async(req,res) =>{
    try {
        const userPosts = await Post.find({user_id:req.params.userId})
        .populate({
            path:'user_id',
            select:'username college profession bio bookmarks _id'
        })
        .exec()

        const userPostWithTime = userPosts.map((post) => ({
            ...post._doc,
            timeSinceCreated:formatTimeSince(new Date(post.createdAt))
        }))


        res.json(userPostWithTime)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error while getting user posts"})
    }
}

const editProfile = async(req,res) =>{
    try {
        
        if(req.isGuest){
            return res.status(403)
            .json({error:"guest user can't edit profile"})
        }

        const userId = req.params.userId
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({error:"invalid user id"})
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({error:"user not found"})
        }

        if(user._id.toString() !== userId.toString()){
            return res.status(403).json({error:"unauthorized"})
        }

        const {newUsername}= req.body

        const usernameSchema = z.string().max(13).min(3)
        const usernameValidationResult = usernameSchema.safeParse(newUsername)
        if (!usernameValidationResult.success) {
            const message = usernameValidationResult.error.issues[0].message.split(
              'g',
            )[1]
            return res.json({ message: 'username ' + message })
          } 

        const existingUsername = await User.findOne({ username:newUsername})
        if(existingUsername){
            return res.status(400).json({error:"username already taken"})
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id:userId  },
            {$set:{username:newUsername}},
            {new:true}
            )

            res.status(200).json({message:"Profile Updated !",updatedUser})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error while editing profile"})
    }
}

export {
    userPostsInfo,
    editProfile
}