import { prisma } from "@/app/utils/prismaClient";
const page = () => {
  // const [finished, setFinished] = useState<boolean>(false);

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

  // seedDatabase(badWordsArray); //enable this to seed the database

  return <div>Seeding page, check the server console for updates</div>;
};

export default page;
