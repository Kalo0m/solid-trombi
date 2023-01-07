import {
  type VoidComponent,
  Switch,
  Match,
  Show,
  createSignal,
  createMemo,
} from "solid-js";
import { A, Title } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { prisma } from "../server/db/client";
import StudentList from "~/components/StudentList";
import { CgProfile } from "solid-icons/cg";
import { getSession } from "@auth/solid-start";
import { authOpts } from "./api/auth/[...solidauth]";
import { getCurrentUser, updateUser } from "~/service/student";
import type { Prisma, Session, User } from "@prisma/client";
import { SessionTokenError } from "@auth/core/errors";

const Home: VoidComponent = () => {
  const user = getCurrentUser();
  const [, update] = updateUser();
  const [newPseudo, setNewPseudo] = createSignal(user()?.name ?? "");
  const localStudents = createServerData$(() => prisma.user.findMany());
  return (
    <>
      <Title>Home</Title>

      <div class=" w-screen min-h-screen md:p-10 overflow-x-hidden">
        <Show
          when={user()?.firstname || user()?.lastname}
          fallback={
            <div class="flex flex-col justify-center items-center h-screen">
              <label class="text-white text-2xl">
                Comment voulez-vous qu'on vous appelle ?
              </label>
              <input
                value={newPseudo()}
                onInput={(e) => setNewPseudo(e.currentTarget.value)}
                class="mt-3 mb-6 outline-none border-none px-4 py-3 w-72 text-xl text-white rounded-lg bg-slate-700"
              />
              <button
                onClick={() =>
                  update({
                    user: { firstname: newPseudo() },
                    id: user()?.id ?? "",
                  })
                }
                class="rounded px-4 py-2 bg-slate-800 hover:scale-105 transition-all"
              >
                <p class=" text-blue-500 text-xl  font-semibold">Enregistrer</p>
              </button>
            </div>
          }
        >
          <Switch fallback={<StudentList students={localStudents() ?? []} />}>
            <Match when={!localStudents()}>
              <div class="font-bold text-2xl text-slate-500">Loading...</div>
            </Match>
          </Switch>
          <A
            href="/me"
            class="fixed right-10 top-10 overflow-hidden rounded-full cursor-pointer bg-gray-800 h-10 w-10"
          >
            <Show
              when={user()?.image}
              fallback={
                <CgProfile color="text-red-500" class="text-blue-500" />
              }
            >
              <img class="w-full h-full bg-cover" src={user()?.image ?? ""} />
            </Show>
          </A>
        </Show>
      </div>
    </>
  );
};

export default Home;
