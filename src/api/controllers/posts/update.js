import Post from '../../models/post.model.js';


const editPost = async (req, res) => {
    try {
        const postId = req.params.postid;
        const postDetails = await Post.findOne({ _id: postId }).populate('user_id', '_id');

        if (!postDetails) {
            return res.status(404).json({ message: "Post not found." });
        }

        const loggedInUserId = req.user._id.toString();

        if (postDetails.user_id._id.toString() !== loggedInUserId) {
            return res.status(403).json({ message: "You are not authorized to edit this post." });
        }

        const { newTitle, newDescription, newTopic } = req.body;

        const updatePostDetails = await Post.findByIdAndUpdate(
            { _id: postId },
            {
                $set: {
                    title: newTitle,
                    description: newDescription,
                    topic: newTopic
                }
            },
            { new: true }
        );

        if (!updatePostDetails) {
            console.log("Post not updated");
        }

        res.status(200).json({
            message: "Post Updated!",
            postDetails: updatePostDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while updating Post!" });
    }
};

export { editPost };
