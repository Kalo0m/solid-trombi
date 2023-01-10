import { createServerData$ } from "solid-start/server";
import { authOpts } from "./api/auth/[...solidauth]";
import { getSession } from "@auth/solid-start";
import { getCurrentUser, updateUser } from "~/service/student";
import { For, createSignal } from "solid-js";

export default function Me() {
  const user = getCurrentUser();
  const tagsAvailable = ["Front", "Back", "Maths", "SSG", "Coq", "Anglais"];
  const [, update] = updateUser();
  const [newPseudo, setNewPseudo] = createSignal(user()?.name ?? "");
  const [promotion, setPromotion] = createSignal(user()?.year ?? 2022);
  const [company, setCompany] = createSignal(user()?.company ?? "");
  const [tags, setTags] = createSignal<string[]>([]);
  return (
    <div class="flex flex-col items-center min-h-screen pt-5">
      <img
        class="rounded-full w-32 h-32 bg-cover mb-5"
        src={user()?.image ?? ""}
      />
      <p class="text-slate-200 font-bold text-5xl mb-3">{user()?.firstname}</p>
      <p class="text-slate-500 font-semibold text-3xl">@{user()?.name}</p>
      <div class="flex flex-col mt-5 justify-start items-start">
        <label class="text-slate-100 text-xl">
          Comment voulez-vous qu'on vous appelle ?
        </label>
        <input
          type="text"
          value={newPseudo()}
          onInput={(e) => setNewPseudo(e.currentTarget.value)}
          class="mt-3 mb-4 h-10  border-spacing-44 transition-all border-collapse border-opacity-0 border-none focus:!border focus:border-blue-600 selection:border-blue-600 outline-none px-4 py-2 w-72 text-xl text-white rounded-md bg-slate-700"
        />
        <label class="text-slate-100 text-xl">
          Quel est votre entreprise ?
        </label>
        <input
          type="text"
          value={company()}
          onInput={(e) => setCompany(e.currentTarget.value)}
          class="mt-3 mb-4 h-10  border-spacing-44 transition-all border-collapse border-opacity-0 border-none focus:!border focus:border-blue-600 selection:border-blue-600 outline-none px-4 py-2 w-72 text-xl text-white rounded-md bg-slate-700"
        />
        <label class="text-slate-100 text-xl">
          Quelle est votre promotion ?
        </label>
        <select
          value={promotion()}
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
          class="rounded mx-auto px-4 py-2 bg-slate-800 hover:scale-105 transition-all"
        >
          <p class=" text-blue-500 text-xl  font-semibold">Enregistrer</p>
        </button>
      </div>
    </div>
  );
}
