import mongoose from "mongoose";
import validator from "validator";

let WritterSchema = new mongoose.Schema({
  // The Below are the necessary Fields for the writer
  name: {
    type: String,
    required: [true, "Please Prvode the name"],
  },
  age: {
    type: String,
    required: [true, "Please Prvode the age"],
  },
  city: {
    type: String,
    required: [true, "Please Prvode the city"],
  },
  province: {
    type: String,
    required: [true, "Please Prvode the province"],
  },
  country: {
    type: String,
    required: [true, "Please Prvode the country"],
  },
  qualifications: {
    type: String,
    required: [true, "Please Prvode the qualifications"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Please Prvode the contactNumber"],
  },
  designation: {
    type: String,
    required: [true, "Please Prvode the designation"],
  },
  purpose: {
    type: String,
    required: [true, "Please Provide your purpose to become the writter"],
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "BlogAppUsers",
    required: [true, "Please first provide your userId"],
  },

  // The Wriiter Send the Request and then we need to approve it
  isApproved: {
    type: Boolean,
    default: false,
  },
  // Below are the fields which writter if wants he can update in the future!
  photo: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  instagramId: {
    type: String,
  },
  linkedinId: {
    type: String,
  },
  pinterestId: {
    type: String,
  },
  youtube: {
    type: String,
  },
  shortBio: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("BlogAppWritter", WritterSchema);
