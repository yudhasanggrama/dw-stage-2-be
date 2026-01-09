import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
        .valid("user", "admin", "supplier")
        .optional()
});
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const addProduct = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    supplierId: Joi.number().required()
})