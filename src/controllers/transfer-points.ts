import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import AppError from "../utils/AppError";

export const transferPoints = async  (req:Request, res:Response,next:NextFunction) => {
    const {amount, senderId, receiverId} = req.body

    try {
        if(amount <= 0) {
            throw new AppError("Points must be more than 0",400)
        }

        const [sender, receiver] = await Promise.all([
            prisma.user.findUnique({where:{id:senderId}}),
            prisma.user.findUnique({where:{id:receiverId}})
        ])

        if (!sender) {
            throw new AppError("Receiver not found",400)
        }

        if (!receiver) {
            throw new AppError("Sender not found",400)
        }

        if (sender.points < amount) {
            throw new AppError("Point not enough to send",400)
        }
    
        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {id:senderId},
                data:{points:{decrement: amount}}
            })
            await prisma.user.update({
                where:{id:receiverId},
                data:{points: {increment:amount}}
            })
        })
        res.json({message: "Transfer success"})
    } catch (error) {
       next(error)
    }
}

export const userPoints = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const userId = Number(req.params.id)
        const userPoints = await prisma.user.findUnique({
            where:{id:userId},
            select: {
                id:true,
                points:true
            }
        })

        if (!userPoints) {
            const err: any = new AppError("User point not found", 404);
            throw err;
        }
        res.status(200).json ({message: "Data has found", data:userPoints});
    } catch (error) {
        next(error)
    }
}