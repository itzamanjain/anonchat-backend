import User from '../../models/user.model'
import Post from '../../models/post.model'


const saveUpvotes = async(req,res) => {
    try {
        if(req.isGuest){
            return res.status(403)
            .json({message:"login kake aa!"})
        }

        const postId = req.params.postId
        const postDetails = await Post.findOne({_id:postId})
        const userDetails = await User.findOne({email:req.user.email})
        const userId = userDetails._id.toString()

        if(postDetails.upvotes.includes(userId)){
            const index = postDetails.upvotes.indexOf(userId)
            postDetails.upvotes.splice(index,1)
            await postDetails.save()
            res.status(200).json({message:"upvote removed",postDetails})

        }else{
            postDetails.upvotes.push(userId)
            await postDetails.save()
            res.json({
                message:"Upvoted",
                postDetails,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

const fetchUpvotes = async(req,res) =>{
    try {
        const postid = req.params.postid
        const postDetails = await Post.findOne({ _id: postid })
        res.json({
             upvotes: postDetails.upvotes,
    })
    } catch (error) {
        console.log(error);
    }
}

export {
    fetchUpvotes,
    saveUpvotes
}