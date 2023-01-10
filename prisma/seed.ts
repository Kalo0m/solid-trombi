import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  {
    name: "Racacax",
    company: "Mixity",
    firstname: "Clément",
  },
  {
    name: "Julien44",
    company: "Kandy",
    firstname: "Julien Raquois",
  },
  {
    name: "Martin le bg",
    company: "Apple",
    firstname: "Martin",
  },
  {
    name: "XxAntoinexX",
    company: "Amazon",
    firstname: "toinou",
  },
  {
    name: "Pierre-victor",
    company: "Trotoir",
    firstname: "pvdevdb",
  },
  {
    name: "LGigaud",
    company: "tanstack",
    firstname: "Lolox le goat",
  },
  {
    name: "FooBar",
    company: "Solid start <3",
    firstname: "BarFoo",
  },
  {
    name: "💶Le thug💶",
    company: "Amazon",
    firstname: "thug",
  },
  {
    name: "Marine IMT",
    company: "Solid.js",
    firstname: "Marine Brier",
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
