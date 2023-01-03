import { type VoidComponent, Switch, Match, createResource } from "solid-js";
import { Title } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { prisma } from "../server/db/client";
import StudentList from "~/components/StudentList";
import { createStudentAction } from "~/service/student";
import { Prisma } from "@prisma/client";

const Home: VoidComponent = () => {
  const localStudents = createServerData$(() => prisma.student.findMany());
  const [isCreating, create] = createStudentAction();
  return (
    <>
      <Title>Home</Title>
      <div class=" w-screen min-h-screen bg-slate-900 overflow-x-hidden">
        <button
          class="px-4 py-2 bg-slate-800 text-white rounded-lg"
          onClick={() => create({ firstname: "John", lastname: "Doe" })}
        >
          Ajouter
        </button>
        <Switch fallback={<StudentList students={localStudents() ?? []} />}>
          <Match when={!localStudents()}>
            <div class="font-bold text-2xl text-slate-500">Loading...</div>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default Home;
