import { z } from "zod";

export const createApplicationSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED", "WITHDRAWN"]),
});
