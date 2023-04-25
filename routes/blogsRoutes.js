import express from "express";

let router = express.Router();

import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getSingleWritterBlogs,
  getAllBlogsWithOutFilters,
  getSingleWriterAllBLogs,
  getAllPendingBlogs,
  approveBlogByAdmin,
  rejectBlogByAdmin,
} from "../controllers/blogController.js";
import { authorizePermissions } from "../middleware/auth.js";

import { isWriterApproved } from "../middleware/auth.js";
import auth from "../middleware/auth.js";

router.route("/").post(auth, isWriterApproved, createBlog).get(getAllBlogs);
router.route("/getSingleWriterAllBLogs/:writerId").get(getSingleWriterAllBLogs);
router.route("/withOutFilters").get(getAllBlogsWithOutFilters);
router.route("/singleBlog/:blogId").get(getSingleBlog);


router.route("/singleWriterBlogs/:writerId").get(getSingleWritterBlogs);
router
  .route("/admin/getAllPendingBlogs")
  .get(auth, authorizePermissions("admin"), getAllPendingBlogs);
router
  .route("/admin/approveBlog/:blogId")
  .get(auth, authorizePermissions("admin"), approveBlogByAdmin);
router
  .route("/admin/rejectBlog/:blogId")
  .get(auth, authorizePermissions("admin"), rejectBlogByAdmin);

export default router;
