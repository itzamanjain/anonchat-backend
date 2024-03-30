import Comment from "../../models/comment";
import User from "../../models/user";

const publishComment = async (req, res) => {
  try {
    if (req.isGuest) {
      return res
        .status(403)
        .json({
          message: "Please login with college email to comment on this post.",
        });
    }

    const commentBody = req.body.content;
    const postid = req.params.postid;
    const email = req.user.email;
    const isReplySection = req.query.isReplySection;
    const parentId = req.body.commentId
    const User  = await User.findOne({email:email})

    const newComment = await new Comment({
        content:commentBody,
        user_id:User._id,
        post_id:postid,
    })

    const saveComment = await newComment.save()

    if(isReplySection === 'true'){
        const updateComment = await Comment.updateOne({_id:saveComment._id},{$set:{parentId:parentId}})

        if(updateComment.nModified === 0){
            return res.status(500).json({message:"failed to update comment"})
        }

    }

    res.json({message:saveComment})

} catch (error) {
    res.status(500).json({ message: "error while publishing comment" });
  }
};

export { publishComment };
