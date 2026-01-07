import express from "express";
import { createProducts, deleteProduct, detailProducts, editProduct, getProducts } from "../controllers/product-controllers";
import { getOrderSummary } from "../controllers/order-controller";

const router  = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', detailProducts)
router.post('/products', createProducts)
router.patch('/products/:id', editProduct)
router.delete('/products/:id', deleteProduct)

router.get('/orders/summary', getOrderSummary)

export default router;