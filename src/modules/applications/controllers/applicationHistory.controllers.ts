import type { Response, Request } from "express";
import mongoose from "mongoose";
import { ApplicationStatusHistory } from "../models/applicationStatusHistory.models";
import { JobApplication } from "../models/jobApplication.models";
import { AppError } from "../../../utils/AppError";

export const getApplicationStatusHistory = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid Application id", 400);
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);
  const applicationObjectId = new mongoose.Types.ObjectId(id);

  //check if application belongs to the user
  const applicationExists = await JobApplication.exists({
    _id: applicationObjectId,
    userId: userObjectId,
  });

  if (!applicationExists) {
    throw new AppError("Application not found", 404);
  }

  const history = await ApplicationStatusHistory.find({
    applicationId: applicationObjectId,
    userId: userObjectId,
  })
    .sort({ changedAt: 1 })
    .select("fromStatus toStatus changedAt -_id");

  return res.json(history);
};
