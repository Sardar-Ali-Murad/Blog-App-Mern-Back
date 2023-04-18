import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import sendResetPassswordEmail from "../utils/sendResetPasswordEmail.js";
import createHash from "../utils/createHash.js";
import crypto from "crypto";

const register = async (req, res) => {
  const { email, password, firstName, lastName, categories, phoneNo } =
    req.body;

  if (
    !firstName ||
    !email ||
    !password ||
    !lastName ||
    !categories ||
    !phoneNo
  ) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({
    firstName,
    email,
    password,
    lastName,
    categories,
    phoneNo,
  });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: user,
    token: token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};


const changeUserImage=async (req,res)=>{
  let user=await User.findOne({_id:req.user.userId})
  user.image=req.body.image
  await user.save()
  res.status(StatusCodes.OK).json({msg:"Success"})
}

const getCurrentUser = async (req, res) => {
  let currentUser = await User.findOne({ _id: req.user.userId });
  const token = currentUser.createJWT();
  currentUser.password=undefined
  res.status(StatusCodes.OK).json({ user: currentUser,token });
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide  email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("This user does not exists in our system");
  }

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // const origin = "http://127.0.0.1:5173";
    const origin = "https://blog-app-front.vercel.app";
    await sendResetPassswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });

  const currentDate = new Date();

  if (user.passwordToken !== createHash(token)) {
    throw new BadRequestError("Your Token Is Incorrect Please Try Again!");
  }

  if (user.passwordTokenExpirationDate < currentDate) {
    throw new BadRequestError("Sorry Your Token Is Expired Try Again!");
  }

  if (user) {
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ msg: "Password Reset Successfully!" });
};

export { register, login, getCurrentUser, forgotPassword, resetPassword,changeUserImage };
