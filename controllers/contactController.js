import ContactModel from "../models/Contact.js";
import { StatusCodes } from "http-status-codes";

export const createContact = async (req, res) => {
  let Contact = await ContactModel.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Your message is dilivered successfully" });
};

// There must be a middleware for this that this route must be accessed by the admins of the app
export const getAllContactMessages = async (req, res) => {
  let AllContactMessages = await ContactModel.find({});
  res.status(StatusCodes.OK).json({ Contacts: AllContactMessages });
};
