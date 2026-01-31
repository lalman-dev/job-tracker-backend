import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export type ApplicationStatus =
  | "APPLIED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "WITHDRAWN";

export interface IJobApplication extends Document {
  userId: mongoose.Types.ObjectId;
  company: string;
  role: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}
const JobApplicationSchema = new Schema<IJobApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["APPLIED", "INTERVIEW", "OFFER", "REJECTED", "WITHDRAWN"],
      default: "APPLIED",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const JobApplication = mongoose.model<IJobApplication>(
  "JobApplication",
  JobApplicationSchema,
);
