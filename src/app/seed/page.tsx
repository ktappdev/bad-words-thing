import { prisma } from "@/app/utils/prismaClient";
import { useState } from "react";
import { badWordsArray } from "@/app/utils/badWords";
const page = () => {
  //   const [finished, setFinished] = useState<boolean>(false);
  async function seedDatabase(items: string[]) {
    let finished = false;
    try {
      for (const item of items) {
        await prisma.badWordsList.create({
          data: {
            word: item,
          },
        });
      }
      console.log("Database seeded successfully!");
      finished = true;
    } catch (error) {
      console.error("Error seeding the database:", error);
    }
  }

  // seedDatabase(badWordsArray);

  return <div>seeding</div>;
};

export default page;
