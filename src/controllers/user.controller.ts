import { prisma } from "../prisma/client"
import { Request, Response } from "express";

export const getUsers = async(req:Request, res:Response) => {
    try {
        const users = await prisma.user.findMany({include: {posts:true}})
        res.status(200).json({message: "All users found", data:users})

    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
}

export const detailUser = async(req:Request, res:Response ) => {
    try {
        const id = parseInt(req.params.id)
        const users = await prisma.user.findUnique({
            where:{id},
            include: {posts:true}
        })
        res.status(200).json({message:"User has found", data:users})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
}

export const createUser = async(req:Request, res:Response) => {
    try {
        const {name} = req.body
        const user = await prisma.user.create({
            data: name
        })
        res.status(201).json({message: "User successfully created", data:user})
    } catch (error) {
        res.status(404).json({error:"Failed to create product"})
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const user = await prisma.user.update({
            where: { id },
            data: { name },
        });
        res.status(200).json({message: "User successfully updated", data:user})
    } catch (error) {
        res.status(500).json({ error: "Failed to update user", details: error })
    }
};

export const deleteUser = async(req:Request, res:Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await prisma.user.delete({
            where: {id}
        })
        res.status(200).json({message: "User successfully deleted", data:user})
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user", details: error })
    }
}