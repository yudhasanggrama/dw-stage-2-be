import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // clear old data
    await prisma.user.deleteMany();

    // create Users
    const user = await prisma.user.createMany({
        data:[
            {   name: "Alice",
                email:"alice@gmail.com",
                points: 1500

            },
            {   name: "Ayu", 
                email:"ayu@gmail.com",
                points: 1500
        },
            {   name: "Andini", 
                email:"andini@gmail.com",
                points: 300
            },
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