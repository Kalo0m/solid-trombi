import { signIn } from "@auth/solid-start/client";
import { AiFillGithub } from "solid-icons/ai";
export default () => {
  const handleLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <div class="flex flex-col justify-center items-center h-screen bg-slate-900">
      <button
        onClick={() => handleLogin("github")}
        class=" flex items-center text-slate-200 rounded mb-5 px-6 py-3 bg-slate-800"
      >
        <AiFillGithub
          color="text-slate-200"
          class="mr-3 text-slate-200"
          size="24"
        />
        <p class="  text-lg font-semibold">Login with Github</p>
      </button>
      <button
        onClick={() => handleLogin("google")}
        class=" flex items-center text-slate-200 rounded mb-5 px-6 py-3 bg-slate-800"
      >
        <AiFillGithub
          color="text-slate-200"
          class="mr-3 text-slate-200"
          size="24"
        />
        <p class="  text-lg font-semibold">Login with Google</p>
      </button>
    </div>
  );
};
