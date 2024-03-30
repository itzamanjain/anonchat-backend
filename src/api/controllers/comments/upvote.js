import Comment from '../../models/comment';
import User from '../../models/user';

const saveCommentUpvotes = async (req, res) => {
    try {
        if(req.isGuest){
            return res.status(403).json({message:'only authenticated users can upvote a comment'});
        }

        const commentid = req.params.commentid;
        const commentDetails = await Comment.findOne({_id:commentid});
        const userDetails = await User.findOne({email:req.user.email});
        const userId = userDetails._id.toString();

        if(commentDetails.upvotes.includes(userId)){
            const index = commentDetails.upvotes.indexOf(userId);
            commentDetails.upvotes.splice(index,1);
            await commentDetails.save();
            res.status(200).json({message:'upvote removed',commentDetails});
        }else{
            commentDetails.upvotes.push(userId);
            await commentDetails.save();
            res.status(200).json({message:'upvote added',commentDetails});


        }


    } catch (error) {
        console.log('error details :',error);
        res.status(500).json({ message: 'error while saving comment upvotes' });
    }
}

const fetchCommentUpvotes = async (req, res) => {
    try {
        const commentid = req.params.commentid;
        const commentDetails = await Comment.findOne({_id:commentid});
        const upvotes  = commentDetails.upvotes;
        res.status(200).json({message:'upvotes fetched successfully',upvotes});
    } catch (error) {
        console.log('error details :',error);
        res.status(500).json({ message: 'error while fetching comment upvotes' });
    }
}

export {
     saveCommentUpvotes,
     fetchCommentUpvotes
}