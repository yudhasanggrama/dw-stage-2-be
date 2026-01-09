import { prisma } from "../prisma/client";
import AppError from "../utils/AppError";

export async function addProducts(name:string, price:number, supplierId:number){
    const supplier = await prisma.supplier.findUnique({
        where: { id: supplierId },
    });

    if (!supplier) {
        throw new AppError("Supplier not found", 404);
    }

    const product = await prisma.product.create({
        data: {
            name,
            price,
            supplierId,
        },
    });

    return product;
}