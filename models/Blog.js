import mongoose from "mongoose";

let BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Provide the title"],
    },
    subTitle: {
      type: String,
      required: [true, "Please Provide the subTitle"],
    },
    description: {
      type: String,
      required: [true, "Please Provide the description"],
    },
    category: {
      type: String,
      enum: [
        "Travel",
        "lifestyle",
        "fashion",
        "dataScience",
        "business",
        "design",
        "health",
        "food",
        "art",
      ],
      require: [true, "Please Provide your Category"],
    },
    writer: {
      type: mongoose.Types.ObjectId,
      ref: "BlogAppWritter",
      required: [true, "Provide the writterId"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("BlogAppBlog", BlogSchema);
