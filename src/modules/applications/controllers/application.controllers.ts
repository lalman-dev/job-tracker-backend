import type { Request, Response } from "express";
import mongoose from "mongoose";
import { JobApplication } from "../models/jobApplication.models.js";
import { ApplicationStatusHistory } from "../models/applicationStatusHistory.models.js";
import { AppError } from "../../../utils/AppError.js";

// Create a new job application
export const createApplication = async (req: Request, res: Response) => {
  const { company, role } = req.body;

  if (!req.userId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!company || !role) {
    throw new AppError("Company and role are required", 400);
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);

  const application = await JobApplication.create({
    userId: userObjectId,
    company,
    role,
  });

  return res.status(201).json(application);
};

// Get all applications
export const getApplications = async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError("Unauthorized", 401);
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);

  const applications = await JobApplication.find({
    userId: userObjectId,
  }).sort({ createdAt: -1 });

  return res.json(applications);
};

// Update application status
export const updateApplicationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!req.userId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid application id", 400);
  }

  if (!status) {
    throw new AppError("Status is required", 400);
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);
  const applicationObjectId = new mongoose.Types.ObjectId(id);

  const application = await JobApplication.findOne({
    _id: applicationObjectId,
    userId: userObjectId,
  });

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  const previousStatus = application.status;

  application.status = status;
  await application.save();

  if (previousStatus !== status) {
    await ApplicationStatusHistory.create({
      applicationId: application._id,
      userId: userObjectId,
      fromStatus: previousStatus,
      toStatus: status,
    });
  }

  return res.json(application);
};

// Delete application
export const deleteApplication = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.userId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!id || Array.isArray(id)) {
    throw new AppError("Invalid application id", 400);
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);
  const applicationObjectId = new mongoose.Types.ObjectId(id);

  const deleted = await JobApplication.findOneAndDelete({
    _id: applicationObjectId,
    userId: userObjectId,
  });

  if (!deleted) {
    throw new AppError("Application not found", 404);
  }

  return res.status(204).send();
};
