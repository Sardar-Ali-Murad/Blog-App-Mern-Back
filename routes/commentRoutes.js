import express from "express"

let router=express.Router()

import {createComment,getSingleBlogComments,updateComment} from "../controllers/blogController.js"
import auth from "../middleware/auth.js"

router.route("/:blogId").post(auth,createComment).get(getSingleBlogComments)
router.route("/updateComment/:commentId").patch(auth,updateComment)

export default router