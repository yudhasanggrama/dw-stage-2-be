import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // clear old data (child → parent)
  await prisma.order.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.user.deleteMany();   

  // USERS
  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@gmail.com" },
      { name: "Ayu", email: "ayu@gmail.com" },
      { name: "Andini", email: "andini@gmail.com" },
    ],
  });

  // SUPPLIERS
  await prisma.supplier.createMany({
    data: [
      { name: "PT XYZ" },
      { name: "PT ABC" },
      { name: "PT DEF" },
    ],
  });

  // ambil supplier (AMAN)
  const suppliers = await prisma.supplier.findMany({
    orderBy: { id: "asc" },
  });

  // PRODUCTS
  await prisma.product.createMany({
    data: [
      { name: "Keyboard", price: 350_000, supplierId: suppliers[0].id },
      { name: "Mouse", price: 30_000, supplierId: suppliers[1].id },
      { name: "Monitor", price: 700_000, supplierId: suppliers[0].id },
      { name: "Laptop", price: 8_050_000, supplierId: suppliers[2].id },
    ],
  });

  // ambil product & user (AMAN)
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
  });

  // STOCK
  await prisma.stock.createMany({
    data: [
      { productId: products[0].id, supplierId: suppliers[0].id, quantity: 10 },
      { productId: products[1].id, supplierId: suppliers[1].id, quantity: 15 },
      { productId: products[2].id, supplierId: suppliers[0].id, quantity: 20 },
      { productId: products[3].id, supplierId: suppliers[2].id, quantity: 5 },
    ],
  });

  // ORDERS
  await prisma.order.createMany({
    data: [
      { userId: users[0].id, productId: products[0].id, quantity: 2 },
      { userId: users[0].id, productId: products[1].id, quantity: 1 },
      { userId: users[1].id, productId: products[2].id, quantity: 1 },
      { userId: users[2].id, productId: products[3].id, quantity: 4 },
    ],
  });
}

main()
  .then(() => console.log("✅ Seeding completed"))
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
