import { Request,Response } from "express";
import { products, Product } from "../models/products_orders-model";

export const getProducts = (req:Request, res:Response)=> {
    res.json(products)
}

export const detailProduct = (req:Request, res:Response)=> {
    const {id} = req.params

    const dataIndex = products.find(item=> item.id === parseInt(id));

    if (dataIndex) {
        res.status(200).json(dataIndex)
    } else {
        res.status(404).send('Item not found');
    }
}

export const createProducts = (req:Request, res:Response)=> {
    const {name, price, stock} = req.body

    const newProduct:Product={
        id:products.length+1,
        name,
        price,
        stock
    }

    products.push(newProduct)
    res.status(201).json(newProduct);
}

export const editProducts = (req:Request, res:Response)=> {
    const {id} = req.params

    const dataIndex = products.findIndex(item=> item.id === parseInt(id));

    if (dataIndex > -1) {
        products[dataIndex].name = req.body.name;
        products[dataIndex].price = req.body.price;
        products[dataIndex].stock = req.body.stock;
        res.status(200).json(products[dataIndex])
    } else {
        res.status(404).send('Item not found');
    }
}

export const deleteProducts = (req:Request, res:Response)=> {
    const {id} = req.params

    const dataIndex = products.findIndex(item=> item.id === parseInt(id))

    if(dataIndex === -1) {
        return res.status(404).json({message: 'Data tidak ditemukan'})
    }

    products.splice(dataIndex,1);
    res.status(200).json(products);
}