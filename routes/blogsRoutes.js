import express from "express";

let router = express.Router();

import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getSingleWritterBlogs,
} from "../controllers/blogController.js";

router.route("/").post(createBlog).get(getAllBlogs);
router.route("/:blogId").get(getSingleBlog);
router.route("/:writerId").get(getSingleWritterBlogs);

export default router;
