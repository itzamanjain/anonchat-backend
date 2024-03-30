import User from "../../models/user";
import Comment from "../../models/comment";

const deleteComment = async (req, res) => {
  try {
    const commentid = req.params.commentid;
    const userDetails = await User.findOne({ email: req.user.email });
    const commentDetails = await Comment.findOne({ _id: commentid });

    if (!commentDetails) {
      return res.status(404).json({ message: "comment not found" });
    }

    if (!userDetails) {
      return res.status(404).json({ message: "user not found" });
    }

    if (commentDetails.user_id.toString() !== userDetails._id.toString()) {
      return res
        .status(403)
        .json({ message: "you are not authorized to delete this comment" });
    }

    const deleteComment = await Comment.deleteOne({ _id: commentid });

    res.json({ message: "comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error while deleting comment" });
  }
};

export { deleteComment };
