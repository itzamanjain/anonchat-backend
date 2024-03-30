import User from "../../models/user.model.js";
import {Feedback} from "../../models/feedback.model.js";

const publishFeedback = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.user.email });

    // Extract feedback from request body
    const { feedback } = req.body;

    // Create a new feedback object
    const newFeedback = new Feedback({
      feedback: feedback,
      user_id: user._id,
    });

    // Save the new feedback
    const savedFeedback = await newFeedback.save();

    // Respond with success message and saved feedback
    res.status(201).json({
      message: "Feedback Uploaded",
      savedFeedback,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "An error occurred while uploading feedback!" });
  }
};

export { publishFeedback };
