import { signIn } from "@auth/solid-start/client";

export default () => {
  return (
    <div class="flex flex-col justify-center items-center h-screen bg-slate-900">
      <button
        onClick={() => signIn("github")}
        class="rounded px-4 py-2 bg-slate-800"
      >
        <p class=" text-blue-500 text-xl font-semibold">Login</p>
      </button>
      <label class="text-white">Comment voulez-vous qu'on vous appelle ?</label>
      <input />
    </div>
  );
};
