import type { Request, Response } from "express";
import mongoose from "mongoose";
import { JobApplication } from "../models/JobApplication.models.js";

// Create a new job application for the authenticated user

export const createApplication = async (req: Request, res: Response) => {
  const { company, role } = req.body;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!company || !role) {
    return res.status(400).json({ message: "Company and role are required" });
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);

  const application = await JobApplication.create({
    userId: userObjectId,
    company,
    role,
  });

  return res.status(201).json(application);
};

// Get all job applications for the authenticated user

export const getApplications = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);

  const applications = await JobApplication.find({
    userId: userObjectId,
  }).sort({ createdAt: -1 });

  return res.json(applications);
};

// Update application status (user-scoped)

export const updateApplicationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid application id" });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);
  const applicationObjectId = new mongoose.Types.ObjectId(id);

  const application = await JobApplication.findOneAndUpdate(
    { _id: applicationObjectId, userId: userObjectId },
    { status },
    { new: true },
  );

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  return res.json(application);
};

// Delete an application (user-scoped)

export const deleteApplication = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid application id" });
  }

  const userObjectId = new mongoose.Types.ObjectId(req.userId);
  const applicationObjectId = new mongoose.Types.ObjectId(id);

  const deleted = await JobApplication.findOneAndDelete({
    _id: applicationObjectId,
    userId: userObjectId,
  });

  if (!deleted) {
    return res.status(404).json({ message: "Application not found" });
  }

  return res.status(204).send();
};
