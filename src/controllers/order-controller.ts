import { prisma } from "../prisma/client";
import {Request,Response} from "express";

export const getOrderSummary = async (req: Request, res: Response) => {
    const {limit, offset} = req.query
    try {
        const summary = await prisma.order.groupBy({
            by: ["userId"],
            _count: {
                id: true
            },
            orderBy: {userId:"asc"},
            skip: Number(offset) || undefined,
            take: Number(limit) || undefined
            });
            
        const result = summary.map(item => ({
            userId: item.userId,
            totalOrders: item._count.id
        }));
        res.json({ message: "Order summary per user", data: result });
    } catch (error) {
        res.status(500).json({ message: "Failed to get order summary" });
    }
};