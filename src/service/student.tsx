import type { Prisma, Student } from "@prisma/client";
import { createServerAction$ } from "solid-start/server";
import { prisma } from "../server/db/client";

export const createStudentAction = () =>
  createServerAction$(async (student: Prisma.StudentCreateInput) => {
    await prisma.student.create({
      data: student,
    });
  });
