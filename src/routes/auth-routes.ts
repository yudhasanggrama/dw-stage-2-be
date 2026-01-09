import express from "express";
import { authenticate } from "../middleware/auth";
import { handleLogin, handleRegister } from "../controllers/auth";

const router  = express.Router()


router.post('/auth/register', handleRegister)
router.post('/auth/login', handleLogin)
router.get('/me', authenticate, (req, res)=> {
    res.json({message: "Protected route"})
})

export default router;