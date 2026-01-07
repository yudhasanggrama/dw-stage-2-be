import { prisma } from "../prisma/client";
import { Request, Response } from "express";

export const getComments = async (req:Request, res:Response) => {
    const {limit,offset} = req.query
    const postId = parseInt(req.params.id)

    try {
        const comments = await prisma.comment.findMany({
            where:{postId},
            take: Number(limit) || undefined,
            skip: Number(offset) || undefined
        })
        res.status(200).json({message: "Comments has found", data:comments})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
}

export const commentSummary = async (req: Request, res: Response) => {
    try {
        const commentsSummary = await prisma.comment.groupBy({
        by: ['postId'],
        _count: { id: true },
        orderBy: {
            _count: {
            id: 'desc',
            },
        },
        });
        const result = commentsSummary.map(item => ({
            postId: item.postId,
            commentsCount: item._count.id,
        }))
        res.status(200).json({message: "All Comments have been found", data: result });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
};



