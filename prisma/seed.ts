import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  {
    name: "Alice",
    company: "Prisma",
    firstname: "Alice",
    lastname: "Smith",
  },
  {
    name: "Théo",
    company: "Kandy",
    firstname: "Alice",
    lastname: "Smith",
  },
];

const promises = users.flatMap((user) => {
  return Array.from({ length: 3 }).map((_, index) => {
    return prisma.user.create({
      data: {
        ...user,
        year: 2023 + index,
        email: `${user.name?.toLowerCase()}${index + 1}@prisma.io`,
      },
    });
  });
});

async function main() {
  await Promise.all(promises);
}

main();
