import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { loginSchema, registerSchema } from "../validation/auth";
import { loginUser, registerUser } from "../services/auth";

export async function handleRegister(req:Request, res:Response, next:NextFunction) {
    try {
        const {error} = registerSchema.validate(req.body);
        
        if (error) {
            throw new AppError("Validation failed", 400);
        }
        const {email, password} = req.body;
        const user = await registerUser(email, password);

        res.status(201).json({message: "User registered", user});
    } catch (error) {
        next(error)
    }
}

export async function handleLogin (req:Request, res:Response, next:NextFunction) {
    try {
        const {error} = loginSchema.validate(req.body)

        if (error) {
            throw new AppError("Validation failed", 400);
        }

        const {email, password} = req.body
    
        const user = await loginUser(email, password)

        res.status(201).json({message: "Login successful", token:user.token});
    } catch (error) {
        next(error)
    }
}