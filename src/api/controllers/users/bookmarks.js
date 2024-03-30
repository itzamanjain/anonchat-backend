import User from "../../models/user.model";

const userBookMarks = async (req, res) => {
  try {
    if (req.isGuest) {
      return res.status(403).json({
        message: "Please login with college email to bookmark this post.",
      });
    }

    const postid = req.params.postid;
    const userDetails = await User.findOne({ email: req.user.email });
    if (userDetails.bookmarks.includes(postid)) {
      // remove bookmark
      userDetails.bookmarks.pull(postid);
      await userDetails.save();

      res
        .status(200)
        .json({ message: "post removed from bookmark", userDetails });
    } else {
      // now do it bookmark
      userDetails.bookmarks.push(postid);
      await userDetails.save();
      res.status(200).json({ message: "Post Bookmarked", userDetails });
    }
  } catch (error) {
    console.log(error);
    req.status(500).json({ message: "error while getting userBookmarks" });
  }
};

const fetchBookMarkedUsers = async (req, res) => {
    try {
       const postid = req.params.postid
       const users = await User.find({bookmarks:{$in:[postid]}})
        const bookMarkedUsers = users.map((user) => user._id)

        res.json({bookMarkedUsers:bookMarkedUsers})
    } catch (error) {
        console.log(error);

    }
};

const fetchUserBookmarkedPosts = async (req, res) => {
    try {
        const userDetails = await User.findOne({email:req.user.email}).populate('bookmarks').exec()
        res.json(userDetails)
    } catch (error) {
        console.log(erroe);
        req.status(500).json({message:"error while getting userBookmarkedPosts"})
    }
};

export { userBookMarks, fetchBookMarkedUsers, fetchUserBookmarkedPosts };
