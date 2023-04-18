import { StatusCodes } from "http-status-codes";

import { BadRequestError } from "../errors/index.js";
import NewsLetter from "../models/NewsLetter.js";

export const createNewsLetterEmail=async (req,res)=>{
    let {email}=req.params
    if(!email){
        throw new BadRequestError("Please Provide the email to proceed")
    }

    let alreadySubscribed=await NewsLetter.findOne({email:email})
    if(alreadySubscribed){
        throw new BadRequestError('You already have subscribed for the newsletter')
    }

    await NewsLetter.create({email:email})

    res.status(StatusCodes.CREATED).json({msg:"Succcess"})
}
