const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase(items:string[]) {
  try {
    for (const item of items) {
      await prisma.item.create({
        data: item,
      });
    }
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Usage example
const items = [
  { name: "Item 1", price: 10 },
  { name: "Item 2", price: 15 },
  { name: "Item 3", price: 20 },
];

seedDatabase(items);
