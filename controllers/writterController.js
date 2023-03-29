import WritterModel from "../models/Writter.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

export const createWritter = async (req, res) => {
  await WritterModel.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Your message to become writter is subbmited successfully" });
};

// This is route must be accessed by the admins only
export const getAllWritterRequests = async (req, res) => {
  let Writters = await WritterModel.find({ isApproved: false });
  res.status(StatusCodes.OK).json({ Writters });
};

export const getAllApprovedWritters = async (req, res) => {
  let ApprovedWritters = await WritterModel.find({ isApproved: true });
  res.status(StatusCodes.OK).json({ ApprovedWritters });
};

// This Route is also accessed by the admins only
export const ApproveWritter = async (req, res) => {
  let { writterId } = req.params;
  let writer = await WritterModel.findOne({ _id: writterId });
  if (!writer) {
    throw new BadRequestError("This is Invalid WritterID");
  }
  writer.isApproved = true;
  await writer.save();
  res.status(StatusCodes.OK).json({ msg: "Writter Approved Successfully" });
};

export const getSingleWritter = async (req, res) => {
  let { writterId } = req.params;
  let Writter = await WritterModel.findOne({ _id: writterId });
  if (!Writter) {
    throw new BadRequestError("This is Invalid WritterID");
  }
  res.status(StatusCodes.OK).json({ Writter });
};
