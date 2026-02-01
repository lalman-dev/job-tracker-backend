import mongoose, { Schema, Document } from "mongoose";

export interface IApplicaionStatusHistory extends Document {
  applicationId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  fromStatus: string;
  toStatus: string;
  changedAt: Date;
}

const ApplicationStatusHistorySchema =
  new mongoose.Schema<IApplicaionStatusHistory>(
    {
      applicationId: {
        type: Schema.Types.ObjectId,
        ref: "JobApplication",
        required: true,
        index: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
      fromStatus: {
        type: String,
        required: true,
      },
      toStatus: {
        type: String,
        required: true,
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
    { versionKey: false },
  );

export const ApplicationStatusHistory = mongoose.model(
  "ApplicationStatusHistory",
  ApplicationStatusHistorySchema,
);
