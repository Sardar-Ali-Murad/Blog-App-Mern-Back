import express from "express";

let router = express.Router();

import {
  createWritter,
  getAllApprovedWritters,
  getAllWritterRequests,
  ApproveWritter,
  getSingleWritter,
  getCurrentWritter,
  updateWriter,
} from "../controllers/writterController.js";

import { authorizePermissions } from "../middleware/auth.js";
import auth from "../middleware/auth.js";

router.route("/postWriter/createWriter").post(auth, createWritter);
router.route("/currentWritter").get(auth, getCurrentWritter);
router.route("/updateWriter/:writerId").post(auth, updateWriter);
router.route("/:writerId").get(getSingleWritter);
router.route("/writers/approvedWriters").get(getAllApprovedWritters);
// Below we need to add the middelware for the admins
router
  .route("/admin/writersRequests")
  .get(auth, authorizePermissions("admin"), getAllWritterRequests);
router
  .route("/admin/approveWriter/:writerId")
  .get(auth, authorizePermissions("admin"), ApproveWritter);

export default router;
