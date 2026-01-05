import express from "express";
import { getProducts, createProducts, editProducts, deleteProducts, detailProduct } from "../controllers/product-controller";
import { getOrder, createOrder, editOrder,deleteOrder, detailOrder } from "../controllers/order-controller";

const router = express.Router();

router.get('/products', getProducts)
router.get('/products/:id', detailProduct)
router.post('/products', createProducts)
router.put('/products/:id', editProducts)
router.delete('/products/:id', deleteProducts)

router.get('/orders', getOrder)
router.get('/orders/:id', detailOrder)
router.post('/orders', createOrder)
router.put('/orders/:id', editOrder)
router.delete('/orders/:id', deleteOrder)

export default router