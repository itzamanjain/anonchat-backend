import User from "../../models/user.model.js";

const saveTopic = async (req, res) => {
  try {
    if (req.isGuest) {
      return res
        .status(403)
        .json({
          message: "Please login with college email to comment on this post.",
        });
    }

    const topicsFollowing = req.body.selectedTopics;
    const user = await User.findOne({ email: req.user.email });
    const updatedUser = await User.updateOne(
      { _id: user._id },
      { $set: { topicsFollowing: topicsFollowing } }
    );

    if (updatedUser.nModified === 0) {
      return res.status(500).json({ message: "failed to update user" });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "error getting save Topic" });
  }
};

export { saveTopic };
