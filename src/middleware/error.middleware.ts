// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Jika AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Default unknown errors
  console.error("ERROR", err);

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};