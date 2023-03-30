import express from "express";

let router = express.Router();

import {
  createWritter,
  getAllApprovedWritters,
  getAllWritterRequests,
  ApproveWritter,
  getSingleWritter,
  getCurrentWritter,
} from "../controllers/writterController.js";

import { authorizePermissions } from "../middleware/auth.js";
import auth from "../middleware/auth.js";

router.route("/").post(auth, createWritter);
router.route("/currentWritter").get(auth, getCurrentWritter);
router.route("/:writerId").get(getSingleWritter);
router.route("/approvedWriters").get(getAllApprovedWritters);
// Below we need to add the middelware for the admins
router
  .route("/writersRequests")
  .get(auth, authorizePermissions("admin"), getAllWritterRequests);
router
  .route("/approveWriter/:writerId")
  .get(auth, authorizePermissions("admin"), ApproveWritter);

export default router;
