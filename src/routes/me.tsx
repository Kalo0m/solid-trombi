import { createServerData$ } from "solid-start/server";
import { authOpts } from "./api/auth/[...solidauth]";
import { getSession } from "@auth/solid-start";
import { getCurrentUser } from "~/service/student";

export default function Me() {
  const user = getCurrentUser();

  return (
    <div class="flex flex-col items-center min-h-screen p-20">
      <img
        class="rounded-full w-52 h-52 bg-cover mb-5"
        src={user()?.image ?? ""}
      />
      <p class="text-slate-200 font-bold text-5xl mb-3">{user()?.firstname}</p>
      <p class="text-slate-500 font-semibold text-3xl">@{user()?.name}</p>
    </div>
  );
}
