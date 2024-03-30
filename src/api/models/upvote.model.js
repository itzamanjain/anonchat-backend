import mongoose from "mongoose"
const Schema = mongoose.Schema;

const upvoteSchema= new Schema (
    {
        upvotedBy:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        comment:{
            type:Schema.Types.ObjectId,
            ref:'Comment'
        },
        post:{
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    },
    {timestamps:true}
)

export const Upvote = mongoose.model("Upvote",upvoteSchema);
