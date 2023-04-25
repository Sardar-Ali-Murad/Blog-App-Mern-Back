import mongoose from "mongoose";

let CommentModel=new mongoose.Schema({
    blog:{
        type:mongoose.Types.ObjectId,
        ref:"BlogAppBlog"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"BlogAppUsers"
    },
    comment:{
        type:String,
        required:[true,"Please Provide the comment to proceed"]
    },
    date:{
        type:Date,
        default: Date.now(),
        required:true
    },
    replies:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:"BlogAppUsers"
            },
            comment:{
                type:String,
                required:[true,"Please Provide the comment to proceed"]
            },
            date:{
                type:Date,
                default:Date.now(),
                required:true
            },
        }
    ]
})

export default mongoose.model("BlogAppComments",CommentModel)