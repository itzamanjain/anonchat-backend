import Post from '../../models/post.model'

const calculatePostViews = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        post.views = post.views +1
        const updatedPost = await post.save()
        res.status(200).josn({
            message:updatedPost
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error while getting Post view"})
    }
}

export {
    calculatePostViews
}