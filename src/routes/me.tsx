import { getCurrentUser, updateUser } from "~/service/student";
import { For, createSignal, Show, Suspense, createEffect } from "solid-js";
import { CgProfile } from "solid-icons/cg";
import { createServerData$ } from "solid-start/server";
import { getSession } from "@auth/solid-start";
import { authOpts } from "./api/auth/[...solidauth]";
import type { User } from "@prisma/client";

export default function Me() {
  const user = createServerData$(async (_, { request }) => {
    return (await getSession(request, authOpts))?.user as User;
  });

  const tagsAvailable = ["Front", "Back", "Maths", "SSG", "Coq", "Anglais"];
  const [, update] = updateUser();

  const [tags, setTags] = createSignal<string[]>([]);

  createEffect(() => {
    if (user.state === "ready") {
      setTags((old) => old.concat(user()?.tags ?? []));
    }
  });
  const [newPseudo, setNewPseudo] = createSignal<string>();
  const pseudo = () => newPseudo() ?? user()?.firstname ?? user()?.name ?? "";

  const [promotion, setPromotion] = createSignal<number>();
  const displayedPromotion = () => promotion() ?? user()?.year ?? 2022;

  const [company, setCompany] = createSignal<string>();
  const displayedCompany = () => company() ?? user()?.company ?? "";

  const displayedTags = () => tags() ?? user()?.tags ?? [];

  return (
    <Suspense fallback={<p class="text-slate-300">Chargement ...</p>}>
      <div class="flex flex-col items-center min-h-screen py-5">
        <Show
          when={user()?.image}
          fallback={
            <div class="flex bg-slate-800 rounded-full justify-center items-center w-32 h-32 mb-5">
              <CgProfile
                color="text-red-500 w-32 h-32 "
                size={64}
                class="text-blue-500"
              />
            </div>
          }
        >
          <img
            class="rounded-full w-32 h-32 bg-cover mb-5"
            src={user()?.image ?? ""}
          />
        </Show>

        <p class="text-slate-200 font-bold text-5xl mb-3">
          {user()?.firstname}
        </p>
        {user()?.name && (
          <p class="text-slate-500 font-semibold text-3xl">@{user()?.name}</p>
        )}
        <div class="flex flex-col my-5 justify-start items-start">
          <label class="text-slate-100 text-xl">
            Comment voulez-vous qu'on vous appelle ?
          </label>
          <input
            type="text"
            value={pseudo()}
            onInput={(e) => setNewPseudo(e.currentTarget.value)}
            class="mt-3 mb-4 h-10  border-spacing-44 transition-all border-collapse border-opacity-0 border-none focus:!border focus:border-blue-600 selection:border-blue-600 outline-none px-4 py-2 w-72 text-xl text-white rounded-md bg-slate-700"
          />
          <label class="text-slate-100 text-xl">
            Quel est votre entreprise ?
          </label>
          <input
            type="text"
            value={displayedCompany()}
            onInput={(e) => setCompany(e.currentTarget.value)}
            class="mt-3 mb-4 h-10  border-spacing-44 transition-all border-collapse border-opacity-0 border-none focus:!border focus:border-blue-600 selection:border-blue-600 outline-none px-4 py-2 w-72 text-xl text-white rounded-md bg-slate-700"
          />
          <label class="text-slate-100 text-xl">
            Quelle est votre promotion ?
          </label>
          <select
            value={displayedPromotion()}
            onChange={(e) => setPromotion(parseInt(e.currentTarget.value))}
            class="bg-slate-700 outline-none px-6 py-2 rounded-md  mb-4 mt-3"
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
                    if (displayedTags().includes(tag)) {
                      setTags(displayedTags().filter((t) => t !== tag));
                    } else {
                      if (displayedTags().length < 3) {
                        setTags((tags) => [...(tags ?? []), tag]);
                      }
                    }
                  }}
                  class="px-5 my-1 border-slate-800 border  cursor-pointer py-1 rounded-full bg-slate-800 mx-2"
                  classList={{
                    "!border-blue-600": displayedTags().includes(tag),
                  }}
                >
                  {tag}
                </div>
              )}
            </For>
          </div>
          <button
            onClick={() =>
              update({
                user: {
                  firstname: pseudo(),
                  company: displayedCompany(),
                  year: displayedPromotion(),
                  tags: displayedTags(),
                },
                id: user()?.id ?? "",
              }).then(() => {
                window.location.href = "/";
              })
            }
            class="rounded mx-auto px-4 py-2 bg-slate-800 hover:scale-105 transition-all"
          >
            <p class=" text-blue-500 text-xl  font-semibold">Enregistrer</p>
          </button>
        </div>
      </div>
    </Suspense>
  );
}
