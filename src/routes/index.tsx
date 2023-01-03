import { type VoidComponent, Switch, Match, createResource } from "solid-js";
import { Title } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { prisma } from "../server/db/client";
import StudentList from "~/components/StudentList";


const Home: VoidComponent = () => {
  const localStudents = createServerData$(() => prisma.student.findMany());
  const [isCreating, create] = createServerAction$(async () => {
    await prisma.student.create({
      data: {
        firstname: "John",
        lastname: "Doe",
        email: ""
      },
    })
  });
  return (
    <>
      <Title>Home</Title>
      <div class=" p-4 w-screen h-screen bg-gray-900">
        <button class="px-4 py-2 bg-gray-800 text-white rounded-lg" onClick={() => create()}>Ajouter</button>
        <Switch
          fallback={
            <StudentList class="mt-10" students={localStudents() ?? []} />
          }
        >
          <Match when={!localStudents()}>
            <div class="font-bold text-2xl text-gray-500">Loading...</div>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default Home;
