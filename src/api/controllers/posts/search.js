import Post from '../../models/post.model'
import formatTimeSince from '../../helpers/timestamp-algo'

const searchPost = async(req,res) =>{
    try {
        const searchQuery = new RegExp(`${req.params.searchQuery}`,'i')
        const searchResults = await Post.find({
            $or:[{title:searchQuery},{description:searchQuery}],
        })
            .populate({
                path:'user_id',
                select:'username college profession bio -_id',
            })
            .exec()

            const postSearchResult = searchResults.map((post) => ({
                ...post._doc,
                timeSinceCreated:formatTimeSince(new Date(post.createdAt)),
            }))
            res.json({
                message:postSearchResult
            })

    } catch (error) {
       console.log(error); 
    }
}

export {
    searchPost
}