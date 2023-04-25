import { StatusCodes } from "http-status-codes";

import { BadRequestError, NotFoundError } from "../errors/index.js";

import CommentModel from "../models/Comment.js";
import BlogModel from "../models/Blog.js";

export const createComment = async (req,res) => {
  let { blogId } = req.params;
  if (!req.body.comment) {
    throw new BadRequestError("Please Provide the comment");
  }
  let Blog = await BlogModel.findOne({ _id: blogId });
  if (!Blog) {
    throw new NotFoundError("The Blog Doest Not Exists");
  }

  await CommentModel.create({
    blog: blogId,
    user: req.user.userId,
    comment: req.body.comment,
    date: Date.now(),
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "The Comment is added successfully" });
};

export const getSingleBlogComments = async (req, res) => {
  let { blogId } = req.params;

  let Blog = await BlogModel.findOne({ _id: blogId });
  if (!Blog) {
    throw new NotFoundError("The Blog Doest Not Exists");
  }

  let blogComments = await CommentModel.find({ blog: blogId })
    .populate({ path: "user", select: "firstName image" })
    .populate({
      path: "replies",
      populate: { path: "user", select: "firstName image" },
    });

  res.status(StatusCodes.OK).json({ blogComments });
};

export const updateComment = async (req, res) => {
  let comment = await CommentModel.findOne({ _id: req.params.commentId });
  if (!comment) {
    throw new NotFoundError("The Comment does not exists");
  }

  let commentObject = {
    user: req.user.userId,
    comment: req.body.comment,
    date:Date.now()
  };

  await CommentModel.findByIdAndUpdate(
    req.params.commentId,
    {
      $push: { replies: commentObject },
    },
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({
      msg: "The Comemnt is updated or the further comment is added successfully",
    });
};
