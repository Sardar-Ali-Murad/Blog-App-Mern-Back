import SaveBlog from "../models/SaveBlog.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import BlogModel from "../models/Blog.js";

export const saveBlog = async (req, res) => {
  let { blogId } = req.params;
  let blog = await BlogModel.findOne({ _id: blogId });
  if (!blog) {
    throw new NotFoundError("The Blog Not Exists");
  }

  let alreadySavedBlog = await SaveBlog.findOne({
    blog: blogId,
    user: req.user.userId,
  });

  if (alreadySavedBlog) {
    throw new BadRequestError("The Blog Is Already Saved By Your");
  }

  await SaveBlog.create({ user: req.user.userId, blog: blogId });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "The Blod is created successfully" });
};

export const DeleteSaveBlog = async (req, res) => {
  let { saveblogId } = req.params;
  let UserSavedBlog = await SaveBlog.findOne({ _id: saveblogId })
  if (!UserSavedBlog) {
    throw new NotFoundError("The Blog Not Exists");
  }

  let ifUserSavedBlog = await SaveBlog.findOne({
    user: req.user.userId,
    _id:saveblogId
  });

  if (!ifUserSavedBlog) {
    throw new UnAuthenticatedError("Invalid Request");
  }

  await UserSavedBlog.remove();
  res.status(StatusCodes.OK).json({ msg: "Blog is deleted Successfully" });
};

export const getCurrentUserSaveBlogs = async (req,res) => {
  let userSavedBlogs = await SaveBlog.find({ user: req.user.userId }).populate({path:"blog",populate:{path:"writer"}});
  res.status(StatusCodes.OK).json({ userSavedBlogs });
};
