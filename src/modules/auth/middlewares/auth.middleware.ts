import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../../utils/AppError.js";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Authorization Header is missing", 401);
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new AppError("Invalid authorization format", 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.userId = decoded.userId;
    next();
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};
