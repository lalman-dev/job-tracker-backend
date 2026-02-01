import type { Response, Request } from "express";
import mongoose from "mongoose";
import { ApplicationStatusHistory } from "../models/applicationStatusHistory.models.js";
import { JobApplication } from "../models/jobApplication.models.js";

export const getApplicationStatusHistory = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthourized",
    });
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      message: "Invalid application id",
    });
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);
  const applicationObjectId = new mongoose.Types.ObjectId(id);

  //check if application belongs to the user
  const applicationExists = await JobApplication.exists({
    _id: applicationObjectId,
    userId: userObjectId,
  });

  if (!applicationExists) {
    return res.status(404).json({
      message: "Application not found",
    });
  }

  const history = await ApplicationStatusHistory.find({
    applicationId: applicationObjectId,
    userId: userObjectId,
  })
    .sort({ changedAt: 1 })
    .select("fromStatus toStatus changedAt -_id");

  return res.json(history);
};
