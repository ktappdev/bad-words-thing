import { prisma } from "@/app/utils/prismaClient";

async function seedDatabase(items: string[]) {
  try {
    for (const item of items) {
      await prisma.badWordsList.create({
        data: {
          word: item,
        },
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
  "hello",
  "b!tch",
  "b17ch",
  "b1tch",
  "bastard",
  "bi+ch",
  "boiolas",
  "buceta",
  "c0ck",
  "cawk",
  "chink",
  "cipa",
  "clits",
  "cock",
  "cum",
  "cunt",
  "dildo",
  "dirsa",
  "ejakulate",
];

seedDatabase(items);
