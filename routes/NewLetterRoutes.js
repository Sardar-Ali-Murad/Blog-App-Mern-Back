import express from "express"
let router=express.Router()

import {createNewsLetterEmail} from "../controllers/NewsLettterController.js"

router.route("/:email").post(createNewsLetterEmail)

export default router