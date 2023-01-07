import { signIn } from "@auth/solid-start/client";
import { AiFillGithub } from "solid-icons/ai";
import { AiOutlineGoogle } from "solid-icons/ai";
import { redirect } from "solid-start";
export default () => {
  const handleLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "http://localhost:3000/" }).then(() =>
      redirect("/")
    );
  };

  return (
    <div class="flex flex-col justify-center items-center h-screen bg-slate-900">
      <h1 class="mb-20 text-5xl font-semibold">Connexion</h1>
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
        class=" flex items-center text-slate-200 rounded mb-5 px-6 py-3 bg-red-700"
      >
        <AiOutlineGoogle
          color="text-slate-200"
          class="mr-3 text-slate-200"
          size="24"
        />
        <p class="  text-lg font-semibold">Login with Google</p>
      </button>
    </div>
  );
};
