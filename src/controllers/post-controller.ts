import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getPosts = async (req:Request, res:Response)=> {
    const {sortBy, order ,authorId, limit, offset} = req.query

    const filters:any = {}

    if(authorId) {
        filters.authorId = Number(authorId)
    }

    try {
        const posts = await prisma.post.findMany({
            where:filters,
            orderBy : {
                [sortBy as string]: order as "asc" | "desc",
            },
            take: Number(limit) || undefined,
            skip: Number(offset) || undefined
        })
        res.status(200).json({message: "All Posts found", data: posts})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch data"})
    }
}

export const getSummary = async (req: Request, res: Response) => {
    const { limit, offset, authorId } = req.query;

    const filters:any = {}

    if(authorId){
        filters.authorId = Number(authorId);
    }

    try {
        const posts = await prisma.post.findMany({
        where: filters,
        take: limit ? Number(limit) : undefined,
        skip: offset ? Number(offset) : undefined,
        include: {
            _count: { select: { comments: true } }
        }
        });

        const summary = posts.filter(post => post._count.comments > 10);

        res.status(200).json({
        message: "All Post with Comments more than 10 are found",
        data: summary
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }



export const detailPosts = async (req:Request, res:Response)=> {
    try {
        const id = parseInt(req.params.id)
        const posts = await prisma.post.findUnique({
            where: {id}
        })
        res.status(200).json({message: "Posts has found", data: posts})
    } catch (error) {
        res.status(500).json({error:"Failed to find data"})
    }
}



export const createPosts =  async (req:Request, res:Response)=> {
    try {
        const { title, content, authorId } = req.body;
        const post = await prisma.post.create({
        data: {
            title,
            content,
            author: { connect: { id: Number(authorId) } },
        },
        });
        res.status(201).json({ message: "Post created", data: post });
    } catch (error) {
        res.status(500).json({ error: "Failed to create post" });
    }
}

export const editPosts = async (req:Request, res:Response)=> {
    try {
        const id = parseInt(req.params.id)
        const {title, content} = req.body
        const posts = await prisma.post.update({
            where: {id}, 
                data: {
                    ...(title && {title}),
                    ...(content && {content})
                }
        })
        res.status(200).json({message: "Post successfully updated", data:posts})
    } catch (error) {
        res.status(404).json({error:"Failed to update post"})
    }
}

export const deletePosts = async (req:Request, res:Response)=> {
    try {
        const id = parseInt(req.params.id)
        const posts = await prisma.post.delete({where:{id}})
        res.status(200).json({message: "Product deleted", data:posts})
    } catch (error) {
        res.status(404).json({error:"Failed to delete post"})
    }
}