import { Request,Response } from "express";
import { orders, Order, OrderItem, products} from "../models/products_orders-model";

export const getOrder = (req:Request, res:Response) => {
    res.json(orders)
}

export const detailOrder =  (req:Request, res:Response) => {
    const {id} = req.params

    const orderIndex = orders.find(item => item.id === parseInt(id))

    if (orderIndex) {
        res.status(200).json(orderIndex)
    } else {
        res.status(404).send('item not found')
    }
}


export const calculateTotalPrice = (items: OrderItem[]) => {
    // menjumlahkan semua subtotal
    return items.reduce((total, item) => {
        // mencari harga produk berdasarkan id
        const product = products.find(
        (p) => p.id === item.productId
        );

        if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
        }

        return total + product.price * item.quantity;
    }, 0);
};

export const createOrder = (req:Request, res:Response) => {
    const { items } = req.body
    //hitung total price menggunakan calculateTotalPrice 
    const totalPrice = calculateTotalPrice(items);

    const newOrder: Order = {
        id: orders.length + 1,
        items,
        totalPrice,
        createdAt: new Date(),
    };

    orders.push(newOrder)
    res.status(201).json(newOrder)
}

export const editOrder =(req:Request, res:Response) => {

    const { id } = req.params
    // cari index order di array
    const dataIndex = orders.findIndex(order => order.id === parseInt(id))

    // validasi
    if (dataIndex > -1) {
        // mengambil items baru dari request body
        const newItems = req.body.items;
        // memanggil fungsi calculateTotalPrice
        const totalPrice = calculateTotalPrice(newItems);
        // update item lama dengan newItems
        orders[dataIndex].items = newItems;
        // update totalprice di order yang sama, totalprice di hitung dari newItems yang baru
        orders[dataIndex].totalPrice = totalPrice;
        // order yang sudah diperbarui
        res.status(200).json(orders[dataIndex]);
    } else {
        res.status(404).send('Item not found');
    }
}

export const deleteOrder = (req:Request, res:Response)=> {
    const {id} = req.params

    const orderIndex = products.findIndex(item=> item.id === parseInt(id))

    if(orderIndex === -1) {
        return res.status(404).json({message: 'Data tidak ditemukan'})
    }
    
    orders.splice(orderIndex,1);
    res.status(200).json(orders);
}