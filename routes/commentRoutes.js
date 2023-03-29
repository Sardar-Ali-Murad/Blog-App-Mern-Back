import express from "express";
let router = express.Router();

import {
  createComment,
  singleBlogComments,
} from "../controllers/commentController.js";

router.route("/createComment/:blogId").post(createComment);
router.route("/:blogId").get(singleBlogComments);

export default router;
