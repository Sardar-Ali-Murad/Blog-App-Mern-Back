import BlogModel from "../models/Blog.js";
import {  StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import WriterModel from "../models/Writter.js";
// import { nanoid } from "nanoid";
// import {Nanoid} from "nanoid"


import CommentModel from "../models/Comment.js";


export const getAllBlogs = async (req, res) => {
  let category = req.query.category;
  const queryObject = {
    status: "selected",
  };

  if (category && category !== "All") {
    queryObject.category = category;
  }

  let Blogs = await BlogModel.find(queryObject).populate({
    path: "writer",
    select: "-email -city -contactNumber -age",
  });
  res.status(StatusCodes.OK).json({ Blogs });
};

export const getAllBlogsWithOutFilters = async (req, res) => {
  let Blogs = await BlogModel.find({ status: "selected" }).populate({
    path: "writer",
    select: "-email -city -contactNumber -age",
  });
  res.status(StatusCodes.OK).json({ Blogs });
};

export const getSingleBlog = async (req, res) => {
  let { blogId } = req.params;
  let Blog = await BlogModel.findOne({ _id: blogId }).populate({
    path: "writer",
    select: "-email -city -contactNumber -age",
  })

  if (!Blog) {
    throw new NotFoundError("The Blog Not Exists");
  }
  res.status(StatusCodes.OK).json({ Blog });
};

export const getSingleWritterBlogs = async (req, res) => {
  let category = req.query.category;
  let { writerId } = req.params;
  const queryObject = {
    status: "selected",
    writer: writerId,
  };
  if (category && category !== "All") {
    queryObject.category = category;
  }
  // let WritterBlogs = await BlogModel.find({ writer: writerId,status:"selected" });
  let WritterBlogs = await BlogModel.find(queryObject);
  res.status(StatusCodes.OK).json({ WritterBlogs });
};

export const getSingleWriterAllBLogs = async (req, res) => {
  let { writerId } = req.params;
  let { status } = req.query;
  let queryObject = {
    writer: writerId,
  };
  if (status && status !== "All") {
    queryObject.status = status;
  }
  let writerAllBlogs = await BlogModel.find(queryObject);
  res.status(StatusCodes.OK).json({ writerAllBlogs });
};

// Here we need to add some middleware for the writters only so that only the approved writter can write the blog
export const createBlog = async (req, res) => {
  let { title, subTitle, description, category, posterImage } = req.body;

  if (!title || !subTitle || !description || !category || !posterImage) {
    throw new BadRequestError("Please Provide all the fields");
  }
  let writer = await WriterModel.findOne({ user: req.user.userId });
  req.body.writer = writer._id;
  await BlogModel.create(req.body);
  res.status(StatusCodes.OK).json({ msg: "The Blog is added Successfully" });
};

// Get All Pending Blogs
export const getAllPendingBlogs = async (req, res) => {
  let queryObject = {
    status: "pending",
  };

  let pendingBlogs = await BlogModel.find(queryObject).populate({
    path: "writer",
    select: "-email -city -contactNumber -age",
  });
  res.status(StatusCodes.OK).json({ pendingBlogs });
};

export const approveBlogByAdmin = async (req, res) => {
  let { blogId } = req.params;
  let approveBlog = await BlogModel.findOne({ _id: blogId });
  if (!approveBlog) {
    throw new BadRequestError("The Blog doest not exists");
  }

  approveBlog.status = "selected";
  await approveBlog.save();
  res.status(StatusCodes.OK).json({ msg: "Blog Approved Successfully" });
};

export const rejectBlogByAdmin = async (req, res) => {
  let { blogId } = req.params;
  let rejectBlog = await BlogModel.findOne({ _id: blogId });
  if (!rejectBlog) {
    throw new BadRequestError("The Blog doest not exists");
  }

  rejectBlog.status = "rejected";
  await rejectBlog.save();
  res.status(StatusCodes.OK).json({ msg: "Blog Rejected Successfully" });
};




// The Comment Portion
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
