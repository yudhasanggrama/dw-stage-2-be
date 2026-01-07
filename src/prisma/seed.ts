import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // clear old data
    await prisma.user.deleteMany()
    await prisma.post.deleteMany()
    await prisma.comment.deleteMany()
    
    

    // create Users
    const user = await prisma.user.createMany({
        data:[
            {name: "Alice", email:"alice@gmail.com"},
            {name: "Ayu", email:"ayu@gmail.com"},
            {name: "Andini", email:"andini@gmail.com"},
        ]
    });

    // create Products
    const posts = await prisma.post.createMany({
        data:[
            {title: "Post pertama", authorId: 1, content:"Konten pertama"},
            {title: "Post kedua", authorId: 1, content:"Konten kedua"},
            {title: "Post pertama", authorId: 2, content:"Konten pertama"},
            {title: "Post kedua", authorId: 2, content:"Konten kedua"},
            {title: "Post pertama", authorId: 3, content:"Konten pertama"},
        ]
    });

    // create Orders
    await prisma.comment.createMany({
        data:[
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
            {postId:1, text:"Cukup bagus"},
            {postId:1, text:"Cukup menarik"},
            {postId:2, text:"Cukup bagus"},
            {postId:2, text:"Kurang bagus"},
            {postId:3, text:"Sangat menarik"},
        ]
    });
}

main()
    .then(()=>{
        console.log("seeding completed");
    })
    .catch((e)=>{
        console.error(e);
    })
    .finally(async()=>{
        await prisma.$disconnect()
    })