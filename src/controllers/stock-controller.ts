import { prisma } from "../prisma/client";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const updateSupplierStock = async (req: Request,res: Response,next: NextFunction) => {
    const { stocks } = req.body

    try {
        // stocks dibuat sebagai array karena endpoint ini mendukung batch update stok.
        // Batch update stok agar bisa diproses sekaligus dalam satu transaksi
        if (!Array.isArray(stocks) || stocks.length === 0) {
        throw new AppError("Stocks must be an array", 400)
        }

        await prisma.$transaction(async (tx) => {
       // Memproses batch update stok satu per satu dalam satu transaction
            for (const s of stocks) {
                if (s.quantity < 0) {
                throw new AppError("Stock cannot be negative", 400)
                }

                const supplier = await tx.supplier.findUnique({
                where: { id: s.supplierId }
                })

                if (!supplier) {
                throw new AppError("Supplier not found", 404)
                }

                await tx.stock.upsert({
                where: {
                    productId_supplierId: {
                    productId: s.productId,
                    supplierId: s.supplierId,
                    },
                },
                update: {
                    quantity: {
                        increment:s.quantity
                    }
                },
                create: {
                    productId: s.productId,
                    supplierId: s.supplierId,
                    quantity: s.quantity
                }
                })
            }
        })

        res.status(200).json({ message: "Stock updated successfully" })
    } catch (error) {
        next(error)
    }
}

export const stockQty = async (req:Request, res:Response, next:any) => {
    try {
        const stocks = await prisma.stock.findMany({
        orderBy: { id: 'asc' },
        })

        res.status(200).json({
        message: "Stock list fetched successfully",
        data: stocks
        })
    } catch (error) {
        next(error)
    }
}

