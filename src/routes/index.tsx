import {
  type VoidComponent,
  Switch,
  Match,
  Show,
  createSignal,
  createMemo,
  For,
  createEffect,
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
  const tagsAvailable = ["Front", "Back", "Maths", "SSG", "Coq", "Anglais"];
  const [, update] = updateUser();

  const user = createServerData$(async (_, { request }) => {
    return (await getSession(request, authOpts))?.user as User;
  });
  createEffect(() => {
    setPromotion(user()?.year ?? 2023);
  });

  const [newPseudo, setNewPseudo] = createSignal(user()?.name ?? "");
  const [promotion, setPromotion] = createSignal(user()?.year ?? 2023);
  const [company, setCompany] = createSignal("");
  const [tags, setTags] = createSignal<string[]>([]);

  return (
    <>
      <Title>Home</Title>

      <div class=" w-screen min-h-screen md:p-10 overflow-x-hidden">
        <Show
          when={user()?.firstname}
          fallback={
            <div class="flex flex-col justify-center items-start w-2/3 h-screen mx-auto">
              <label class="text-slate-100 text-xl">
                Comment voulez-vous qu'on vous appelle ?
              </label>
              <input
                type="text"
                value={newPseudo()}
                onInput={(e) => setNewPseudo(e.currentTarget.value)}
                class="mt-3 mb-4 h-10  transition-all border-collapse border-opacity-0 border-none focus:!border focus:border-blue-600  outline-none px-4 py-2 w-72 text-xl text-white rounded-md bg-slate-700"
              />
              <label class="text-slate-100 text-xl">
                Quel est votre entreprise ?
              </label>
              <input
                type="text"
                value={company()}
                onInput={(e) => setCompany(e.currentTarget.value)}
                class="mt-3 mb-4 h-10  border-spacing-44 transition-all border-collapse border-opacity-0 border-none focus:!border focus:border-blue-600 outline-none px-4 py-2 w-72 text-xl text-white rounded-md bg-slate-700"
              />
              <label class="text-slate-100 text-xl">
                Quelle est votre promotion ?
              </label>
              <select
                value={promotion()}
                onChange={(e) => setPromotion(parseInt(e.currentTarget.value))}
                class="bg-slate-700 border-none outline-none px-6 py-2 rounded-md  mb-4 mt-3"
              >
                <option value="2023">2023 (A3)</option>
                <option value="2024">2024 (A2)</option>
                <option value="2025">2025 (A1)</option>
              </select>
              <label class="text-slate-100 text-xl">
                Choisissez vos tags (max 3)
              </label>
              <div class="flex mt-3 mb-6 flex-row flex-wrap">
                <For each={tagsAvailable}>
                  {(tag) => (
                    <div
                      onClick={() => {
                        if (tags().includes(tag)) {
                          setTags(tags().filter((t) => t !== tag));
                        } else {
                          if (tags().length < 3) {
                            setTags((tags) => [...tags, tag]);
                          }
                        }
                      }}
                      class="px-5 my-1 border-slate-800 border  cursor-pointer py-1 rounded-full bg-slate-800 mx-2"
                      classList={{
                        "!border-blue-600": tags().includes(tag),
                      }}
                    >
                      {tag}
                    </div>
                  )}
                </For>
              </div>

              <button
                disabled={newPseudo().length === 0}
                onClick={() =>
                  update({
                    user: {
                      firstname: newPseudo(),
                      company: company(),
                      year: promotion(),
                      tags: tags(),
                    },
                    id: user()?.id ?? "",
                  })
                }
                class=" disabled:hover:scale-100 disabled:pointer-events-none disabled:text-slate-400 text-blue-500 rounded mx-auto px-4 py-2 bg-slate-800 hover:scale-105 transition-all"
              >
                <p class="  text-xl  font-semibold">Enregistrer</p>
              </button>
            </div>
          }
        >
          <StudentList />

          <A
            href="/me"
            class="fixed right-10 top-10 overflow-hidden rounded-full cursor-pointer bg-gray-800 h-10 w-10"
          >
            <Show
              when={user()?.image}
              fallback={
                <div class="flex justify-center items-center w-full h-full">
                  <CgProfile color="text-red-500 " class="text-blue-500" />
                </div>
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
