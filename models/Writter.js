import mongoose from "mongoose";

let WritterSchema = new mongoose.Schema({
  // The Below are the necessary Fields for the writer
  name: {
    type: String,
    required: [true, "Please Prvode the name"],
  },
  age: {
    type: Number,
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
    required: [true, "Please Prvode the email"],
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

  // Below are the fields which writter if wants he can update in the future!
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

  // The Wriiter Send the Request and then we need to approve it
  isApproved: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("BlogAppWritter", WritterSchema);
