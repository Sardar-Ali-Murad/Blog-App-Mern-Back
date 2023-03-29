import WritterModel from "../models/Writter.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

export const createWritter = async (req, res) => {
  let {
    name,
    age,
    city,
    province,
    country,
    qualifications,
    email,
    contactNumber,
    designation,
    purpose,
  } = req.body;
  if (
    !name ||
    !age ||
    !city ||
    !country ||
    !province ||
    !qualifications ||
    !email ||
    !contactNumber ||
    !designation ||
    !purpose
  ) {
    throw new BadRequestError("Please Provide all the fields");
  }
  await WritterModel.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Your request to become writter is submited successfully" });
};

// This is route must be accessed by the admins only Here Displays the all wriiters how requested to become the writter
export const getAllWritterRequests = async (req, res) => {
  let Writters = await WritterModel.find({ isApproved: false });
  res.status(StatusCodes.OK).json({ Writters });
};

// Here Comes all the writters which are approved by the admins
export const getAllApprovedWritters = async (req, res) => {
  let ApprovedWritters = await WritterModel.find({ isApproved: true });
  res.status(StatusCodes.OK).json({ ApprovedWritters });
};

// This Route is also accessed by the admins only Here the admin see a paticulae writter who requested to become writter then they approve them to become writter
export const ApproveWritter = async (req, res) => {
  let { writerId } = req.params;
  let writer = await WritterModel.findOne({ _id: writerId, isApproved: false });
  if (!writer) {
    throw new BadRequestError("This is Invalid WritterID");
  }
  writer.isApproved = true;
  await writer.save();
  res.status(StatusCodes.OK).json({ msg: "Writter Approved Successfully" });
};

export const getSingleWritter = async (req, res) => {
  let { writerId } = req.params;
  let Writter = await WritterModel.findOne({ _id: writerId });
  if (!Writter) {
    throw new BadRequestError("This is Invalid WritterID");
  }
  res.status(StatusCodes.OK).json({ Writter });
};
