import express from "express";
import { createProducts, deleteProduct, detailProducts, editProduct, getProducts } from "../controllers/product-controllers";
import { getOrderSummary } from "../controllers/order-controller";
import {stockQty, updateSupplierStock } from "../controllers/stock-controller";
import { handleLogin, handleRegister } from "../controllers/auth";
import { authenticate } from "../middleware/auth";
import upload from "../middleware/upload";
import cors from "cors";
import rateLimit from "express-rate-limit";

const router  = express.Router();

const corsOptions = {
    origin:'http://127.0.0.1:5500',
    method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus:204
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit:3,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
})

router.use(limiter)

router.get('/products',cors(corsOptions), getProducts)
router.get('/products/:id', detailProducts)
router.post('/products/upload-images', upload.single("file") ,createProducts)
router.patch('/products/:id', editProduct)
router.delete('/products/:id', deleteProduct)

router.get('/orders/summary', getOrderSummary)

router.get('/suppliers/stocks/',authenticate ,stockQty)
router.post('/suppliers/stock',authenticate ,updateSupplierStock)

router.post('/supplier/register', handleRegister)
router.post('/supplier/login', handleLogin)

export default router;