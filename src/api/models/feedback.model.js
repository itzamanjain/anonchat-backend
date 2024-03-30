import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const feedbackSchema= new Schema(
    {
        feedback:{
            type:String,
            required:true
        },
        user_id:{
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {timestamps:true}
)

export const Feedback=mongoose.model("Feedback",feedbackSchema)
