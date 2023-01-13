import { signIn } from "@auth/solid-start/client";
import { AiFillGithub } from "solid-icons/ai";
import { AiOutlineGoogle } from "solid-icons/ai";
import { createSignal } from "solid-js";
import { redirect } from "solid-start";
export default () => {
  const handleLogin = (
    provider: string,
    rest?: Record<string, string> | undefined
  ) => {
    signIn(provider, {
      email: rest?.email,
    }).then(() => redirect("/"));
  };
  const [email, setEmail] = createSignal("");
  return (
    <div class="flex flex-col justify-center items-center h-screen bg-slate-900">
      <div class="w-80">
        <h1 class="mb-20 text-5xl font-semibold">Connexion</h1>
        <input
          class="text-black outline-none bg-slate-200 rounded px-6 py-3 w-full "
          value={email()}
          placeholder="Email"
          type="text"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button
          class="w-full mt-3 bg-blue-900 text-center rounded px-6 py-3 text-lg font-semibold"
          onClick={() => handleLogin("email", { email: email() })}
        >
          Send
        </button>
        <div class="my-6 flex items-center">
          <div class="h-[1px] bg-slate-300 w-full mr-3" />
          <p class="text-slate-300">ou</p>
          <div class="h-[1px] bg-slate-300 w-full ml-3" />
        </div>
        <button
          onClick={() => handleLogin("github")}
          class="w-full  flex justify-center items-center text-slate-200 rounded mb-3 px-6 py-3 bg-slate-800"
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
          class="w-full flex justify-center items-center text-slate-200 rounded mb-5 px-6 py-3 bg-red-700"
        >
          <AiOutlineGoogle
            color="text-slate-200"
            class="mr-3 text-slate-200"
            size="24"
          />
          <p class="  text-lg font-semibold">Login with Google</p>
        </button>
      </div>
    </div>
  );
};
