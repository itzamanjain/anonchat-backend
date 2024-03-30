import Comment from '../../models/comment';
import Post from '../../models/post';

const fetchComments = async (req, res) => {
    try {
        const postid = req.query.postid;

        const commentForPost = await Comment.find({post_id:postid})
        .populate({
            path:'user_id',
            select:'username college profession bio _id'
        })
        .populate('post_id')
        .exec();

        await Post.updateOne({_id:postid},{$set:{totalComments:commentForPost.length}})

        res.json({message:commentForPost})
    } catch (error) {
        res.status(500).json({ message: 'error while fetching comments' });
    }
}

export { fetchComments };