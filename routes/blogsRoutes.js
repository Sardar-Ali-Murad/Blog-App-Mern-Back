import express from "express";

let router = express.Router();

import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getSingleWritterBlogs,
  getAllBlogsWithOutFilters
} from "../controllers/blogController.js";

import { isWriterApproved } from "../middleware/auth.js";
import auth from "../middleware/auth.js";

router.route("/").post(auth, isWriterApproved, createBlog).get(getAllBlogs);
router.route("/withOutFilters").get(getAllBlogsWithOutFilters);
router.route("/singleBlog/:blogId").get(getSingleBlog);
router.route("/singleWriterBlogs/:writerId").get(getSingleWritterBlogs);

export default router;
