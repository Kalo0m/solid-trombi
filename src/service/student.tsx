import { getSession } from "@auth/solid-start";
import type { Prisma, Session, User } from "@prisma/client";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { authOpts } from "~/routes/api/auth/[...solidauth]";
import { prisma } from "../server/db/client";

type SessionWithUser = Session & { user: User };

export const createStudentAction = () =>
  createServerAction$(async (student: Prisma.UserCreateInput) => {
    await prisma.user.create({
      data: student,
    });
  });

export const getCurrentUser = () =>
  createServerData$(async (_, { request }) => {
    return (await getSession(request, authOpts))?.user as User;
  });

export const updateUser = () =>
  createServerAction$(
    async ({ id, user }: { id: string; user: Prisma.UserCreateInput }) => {
      return await prisma.user.update({ where: { id }, data: user });
    }
  );
