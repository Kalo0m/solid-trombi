import {
  type VoidComponent,
  Switch,
  Match,
  createResource,
  Show,
} from "solid-js";
import { A, Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { prisma } from "../server/db/client";
import StudentList from "~/components/StudentList";
import { createStudentAction } from "~/service/student";
import { CgProfile } from "solid-icons/cg";
import { getSession } from "@auth/solid-start";
import { authOpts } from "./api/auth/[...solidauth]";
import { signIn, signOut } from "@auth/solid-start/client";

export const routeData = () => {
  return createServerData$(async (_, { request }) => {
    return await getSession(request, authOpts);
  });
};

const Home: VoidComponent = () => {
  const res = useRouteData<typeof routeData>();
  const localStudents = createServerData$(() => prisma.user.findMany());

  return (
    <>
      <Title>Home</Title>
      <pre class="text-white">{JSON.stringify(res())}</pre>

      <div class=" w-screen min-h-screen bg-slate-900 overflow-x-hidden">
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
            when={res()?.user?.image}
            fallback={<CgProfile color="text-red-500" class="text-blue-500" />}
          >
            <img class="w-full h-full bg-cover" src={res()!.user!.image!} />
          </Show>
        </A>
      </div>
    </>
  );
};

export default Home;
