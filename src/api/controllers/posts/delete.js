import Post from '../../models/post.model.js'
import User from '../../models/user.model.js'

const deletePost = async (req, res) => {
    try {
        const { email } = req.user;
        if (!email) {
            return res.status(403).json({ message: "Please login with a college email to delete a post." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const postId = req.params.postid;
        const postDetails = await Post.findOne({ _id: postId });

        if (postDetails.user_id.toString() === user._id.toString()) {
            await Post.deleteOne({ _id: postId });
            return res.status(200).json({ message: "Post deleted successfully!" });
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this post." });
        }
    } catch (error) {
        return res.status(500).json({ message: error?.message || "Error while deleting post." });
    }
}

export {
    deletePost
}
