import { prisma } from "../connection/client";
import { Request, Response } from "express";

export const getProducts = async(req:Request, res:Response) => {
    try {
        const products =  await prisma.product.findMany()
        res.status(200).json({message: "all products found", data: products})
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
        const {name , price} = req.body
        const product = await prisma.product.create({
            data:{name,price: parseFloat(price)}
        })
        res.status(201).json({message: "Product successfully added", data: product})
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
                ...(name && {name}),
                ...(price && {price: parseFloat(price)})
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
        res.status(201).json({message: "Product deleted", data:deleteProducts})
    } catch (error) {
        res.status(404).json({error:"Failed to delete product"})
    }
}