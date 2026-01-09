import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";
import AppError from "../utils/AppError";

export async function registerUser(email:string, password:string){
    if(!email.match(/@/) || password.length < 6) {
        throw new AppError("Invalid password",400)
    }

    const hashed = await bcrypt.hash(password,10);
    const user = await prisma.user.create({
        data: {email, password: hashed},
    });

    return user
}

export async function loginUser(email:string, password:string){
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new AppError("Invalid email", 401)
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        throw new AppError("Invalid password", 401)
    }

    const token = signToken({
        id: user.id,
        role: user.role
    })
    return {token}
}