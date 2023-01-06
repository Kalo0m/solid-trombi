import type { Student } from "@prisma/client";
import type { ParentComponent } from "solid-js";
import { For } from "solid-js";
import { createStudentAction } from "~/service/student";
import StudentITem from "./StudentITem";

type StudentListProps = {
  students: Student[];
};

const StudentList: ParentComponent<StudentListProps> = (props) => {
  const [isCreating, create] = createStudentAction();

  const onAddClick = async () => {
    console.log("onAddClick");
    await create({ firstname: "Théo", lastname: "Letouzé", email: "theo@let" });
  };

  return (
    <div class="flex flex-col justify-center items-center">
      <div class="mx-auto  grid grid-cols-4 gap-2">
        <For each={props.students}>
          {(student) => (
            <div class="m-2">
              <StudentITem student={student} />
            </div>
          )}
        </For>
        <div
          class="flex h-64 justify-center items-center"
          onClick={() => onAddClick()}
        >
          <div class=" cursor-pointer mb-2 rounded-full w-14 h-14 bg-slate-800 flex justify-center items-center">
            <p class="text-blue-500 uppercase font-medium text-2xl p-0 m-0">
              +
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
