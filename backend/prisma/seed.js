import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const users = [
    { id: 1, email: "demo1@example.com", fullName: "Demo User One" },
    { id: 2, email: "demo2@example.com", fullName: "Demo User Two" },
    { id: 3, email: "demo3@example.com", fullName: "Demo User Three" },
  ];

  for (const user of users) {
    await prisma.User.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  console.log("✅ Users seeded");

  const tasks = [
    // User 1
    { title: "Morning workout", status: "OPEN", userId: 1 },
    { title: "Read a book", status: "DONE", userId: 1 },
    { title: "Write blog post", status: "IN_PROGRESS", userId: 1 },
    { title: "Plan weekend trip", status: "OPEN", userId: 1 },
    { title: "Refactor backend code", status: "DONE", userId: 1 },
    { title: "Fix frontend bugs", status: "IN_PROGRESS", userId: 1 },
    { title: "Prepare interview notes", status: "OPEN", userId: 1 },
    { title: "Clean workspace", status: "DONE", userId: 1 },

    // User 2
    { title: "Buy groceries", status: "OPEN", userId: 2 },
    { title: "Cook dinner", status: "DONE", userId: 2 },
    { title: "Submit expense report", status: "IN_PROGRESS", userId: 2 },
    { title: "Pay electricity bill", status: "DONE", userId: 2 },
    { title: "Call parents", status: "OPEN", userId: 2 },
    { title: "Update resume", status: "IN_PROGRESS", userId: 2 },
    { title: "Book flight tickets", status: "OPEN", userId: 2 },

    // User 3
    { title: "Team meeting", status: "DONE", userId: 3 },
    { title: "Code review", status: "IN_PROGRESS", userId: 3 },
    { title: "Design new feature", status: "OPEN", userId: 3 },
    { title: "Update documentation", status: "OPEN", userId: 3 },
    { title: "Fix production bug", status: "IN_PROGRESS", userId: 3 },
    { title: "Deploy new release", status: "DONE", userId: 3 },
    { title: "Respond to emails", status: "OPEN", userId: 3 },
    { title: "Sprint planning", status: "DONE", userId: 3 },
  ];

  for (const task of tasks) {
    await prisma.Task.create({
      data: {
        title: task.title,
        status: task.status,
        user: {
          connect: { id: task.userId },
        },
      },
    });
  }

  console.log("✅ Tasks seeded");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
