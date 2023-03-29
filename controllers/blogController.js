import BlogModel from "../models/Blog.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";

export const getAllBlogs = async (req, res) => {
  let Blogs = await BlogModel.find({ category: req.query.category }).populate(
    "writer"
  );
  res.status(StatusCodes.OK).json({ Blogs });
};

export const getSingleBlog = async (req, res) => {
  let { blogId } = req.params;
  let Blog = await BlogModel.find({ _id: blogId }).populate("writer");
  if (!Blog) {
    throw new NotFoundError("The Blog Not Exists");
  }
  res.status(StatusCodes.OK).json({ Blog });
};

export const getSingleWritterBlogs = async (req, res) => {
  let { writerId } = req.params;
  let WritterBlogs = await BlogModel.find({ writer: writerId });
  res.status(StatusCodes.OK).json({ WritterBlogs });
};

// Here we need to add some middleware for the writters only
export const createBlog = async (req, res) => {
  let { writerId } = req.body;
  req.body.writer = writerId;
  await BlogModel.create(req.body);
  res.status(StatusCodes.OK).json({ msg: "The Blog is added Successfully" });
};
