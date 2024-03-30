import User from '../../models/user.model.js'
import Post from '../../models/post.model.js'

const publishPost = async (req, res) => {
    try {
        const { email } = req.user;
        if (!email) {
            return res.status(403).json({ message: "Please login with a college email to Post !!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const { topic, title, description } = req.body;
        const newPost = new Post({
            topic,
            title,
            description,
            user_id: user._id,
        });
        const savedPost = await newPost.save();
        return res.status(200).json({
            message: "Post uploaded successfully",
            savedPost,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Error occurred while uploading Post" });
    }
};

export {
    publishPost
};
