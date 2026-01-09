import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import AppError from "../utils/AppError";

export function authenticate(req: Request, res:Response, next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new AppError("Unauthorized", 401);
    }

    try {
        const decode = verifyToken(token);
        (req as any).user = decode as any;
        next()
    } catch (error) {
        throw new AppError("Invalid Token", 401)
    }
}