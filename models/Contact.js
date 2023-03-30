// This is the contact Schema if some one has the query then he will fill this form

import mongoose from "mongoose";

let ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide the name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide the email"],
  },
  contact: {
    type: String,
    required: [true, "Please Provide the contact"],
  },
  reason: {
    type: String,
    enum: ["Reason No1", "Reason No2", "Reason No2"],
    required: [true, "Please Provide the reason for you contact"],
  },
  message: {
    type: String,
    required: [true, "Please Provide the message"],
  },
});

export default mongoose.model("BlogAppContact", ContactSchema);
