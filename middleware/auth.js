import jwt from "jsonwebtoken";
import { UnAuthenticatedError, NotFoundError } from "../errors/index.js";
import WriterModel from "../models/Writter.js";

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

export const isWriterApproved = async (req, res, next) => {
  try {
    let currentWritter = await WriterModel.findOne({ user: req.user.userId });
    if (!currentWritter) {
      throw new NotFoundError("The Writer Does Not Exists");
    }
    if (!currentWritter.isApproved) {
      throw new UnAuthenticatedError("You cannot access this route");
    }
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthenticatedError("Unauthorized to access this route");
    }
    next();
  };
};

export default auth;
