import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        username: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
          index: true,
        },
        password: {
          type: String,
          required: true,
        },
        college: {
          type: String,
        },
        verificationCode: {
          type: String,
        },
        location: {
          type: String,
          default: "",
        },
        profession: {
          type: String,
        },
        profilePicture: {
          type: String,
          default: "",
        },
        bio: {
          type: String,
          default: "",
        },
        topicsFollowing: [
          {
            name: String,
            id: String,
          },
        ],
    
        bookmarks: [
          {
            type: Schema.Types.ObjectId,
            ref: "Post",
          },
        ],
        
      },
{timestamps:true})

const  User = mongoose.model("User",UserSchema);

export default User;
// module.exports = User;