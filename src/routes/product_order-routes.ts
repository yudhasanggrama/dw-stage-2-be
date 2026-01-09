import express from "express";
import { createProducts, deleteProduct, detailProducts, editProduct, getProducts } from "../controllers/product-controllers";
import { getOrderSummary } from "../controllers/order-controller";
import {stockQty, updateSupplierStock } from "../controllers/stock-controller";
import { handleLogin, handleRegister } from "../controllers/auth";
import { authenticate } from "../middleware/auth";

const router  = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', detailProducts)
router.post('/products/add', createProducts)
router.patch('/products/:id', editProduct)
router.delete('/products/:id', deleteProduct)

router.get('/orders/summary', getOrderSummary)

router.get('/suppliers/stocks/',authenticate ,stockQty)
router.post('/suppliers/stock',authenticate ,updateSupplierStock)

router.post('/supplier/register', handleRegister)
router.post('/supplier/login', handleLogin)

export default router;