import mongoose from "mongoose"
import validator from "validator";

let BlogsNewLetter=new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
          validator: validator.isEmail,
          message: "Please provide a valid email",
        },
      },
},{timestamps:true})

export default mongoose.model("BlogsAppNewLetter",BlogsNewLetter)
