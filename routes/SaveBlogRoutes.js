import express from "express"
let router=express.Router()
import {saveBlog,DeleteSaveBlog,getCurrentUserSaveBlogs}  from "../controllers/SaveBlogController.js"

router.route("/").get(getCurrentUserSaveBlogs)
router.route("/deleteSavedBlog/:saveblogId").delete(DeleteSaveBlog)
router.route("/:blogId").get(saveBlog)

export default router