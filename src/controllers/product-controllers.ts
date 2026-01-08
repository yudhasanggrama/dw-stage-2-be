import { prisma } from "../prisma/client";
import { Request, Response } from "express";

export const getProducts = async(req:Request, res:Response) => {
    const {
        sortBy, 
        order, 
        price,
        minPrice,
        maxPrice,
        limit,
        offset
    } = req.query

    const filters:any = {}

    // min-max price
    if (minPrice) {
        filters.price =  {gte: parseFloat(minPrice as string)};
    }
    
    if (maxPrice) {
        filters.price = {
            ...(filters.price || {}),
            lte: parseFloat(maxPrice as string),
        };
    }
    try {
        const products =  await prisma.product.findMany({
            where: filters,
            orderBy: {
                [sortBy as string]: order as "asc" | "desc"
            },
            take: Number(limit) || undefined,
            skip: Number(offset) || undefined
        })

        const total = await prisma.product.count({where : filters})
        res.status(200).json({message: "All products found", data: products,total})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
}


export const detailProducts = async(req:Request, res:Response) => {
    try {
        const id = parseInt(req.params.id);
        const products =  await prisma.product.findUnique({
            where: {id}
        })
        res.status(200).json({message: "Product has found", data:products})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
}

export const createProducts = async (req:Request, res:Response)=> {
    try {
        const {name , price, supplierId} = req.body
        const product = await prisma.product.create({
            data: {
                name,
                price: Number(price),
                supplierId: Number(supplierId),
            },
        })
        res.status(201).json({message: "Product successfully created", data: product})
    } catch (error) {
        res.status(404).json({error:"Failed to create product"})
    }
}

export const editProduct = async(req:Request, res:Response)=> {
    try {
        const id = parseInt(req.params.id)
        const {name, price} = req.body

        const product = await prisma.product.update({
            where: {id}, 
            data:{
                name,
                price : parseFloat(price)
            }
        })

        res.status(200).json({message: "Product Updated", data: product})

    } catch (error) {
        res.status(404).json({error:"Failed to update product"})
    }
}

export const deleteProduct = async(req:Request, res:Response) => {
    try {
        const id = parseInt(req.params.id)
        const deleteProducts = await prisma.product.delete({where : {id} })
        res.status(200).json({message: "Product deleted", data:deleteProducts})
    } catch (error) {
        res.status(404).json({error:"Failed to delete product"})
    }
}