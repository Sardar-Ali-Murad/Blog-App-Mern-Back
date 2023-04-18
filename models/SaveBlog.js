import mongoose from "mongoose";

let SaveBlog=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"BlogAppUsers",
        required:[true,"Please Provide the user"]
    },
    blog:{
        type:mongoose.Types.ObjectId,
        ref:"BlogAppBlog",
        required:[true,"Please Provide the BlogId"]
    }    
},{})

export default mongoose.model("SaveBlog",SaveBlog)