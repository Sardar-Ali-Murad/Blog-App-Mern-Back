import express from "express";

let router = express.Router();

import {
  createContact,
  getAllContactMessages,
} from "../controllers/contactController.js";

router.route("/").post(createContact).get(getAllContactMessages);

export default router;
