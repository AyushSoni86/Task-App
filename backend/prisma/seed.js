import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.User.findUnique({
    where: { id: 1 },
  });

  if (!existingUser) {
    await prisma.User.create({
      data: {
        id: 1,
        email: "ayush@example.com",
        fullName: "Ayush Soni",
      },
    });

    console.log("Seeded user with id = 1");
  } else {
    console.log("User already exists, skipping seed");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
