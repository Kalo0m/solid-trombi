import type { User } from "@prisma/client";
import { ParentComponent, Suspense } from "solid-js";
import { createSignal } from "solid-js";
import { For } from "solid-js";
import { createStudentAction } from "~/service/student";
import StudentITem from "./StudentITem";
import { createServerData$ } from "solid-start/server";
import { prisma } from "../server/db/client";

type StudentListProps = {
  students: User[];
};

const StudentList = () => {
  const [promotion, setPromotion] = createSignal(2023);

  const localStudents = createServerData$(
    ([, year]) => prisma.user.findMany({ where: { year: year as number } }),
    { key: () => ["users", promotion()] }
  );
  return (
    <div>
      <select
        value={promotion()}
        onChange={(e) => setPromotion(parseInt(e.currentTarget.value))}
        class="bg-slate-700 px-3 outline-none border-none py-2 rounded-md  mb-8 mt-3 text-left"
      >
        <option value="2023">2023 (A3)</option>
        <option value="2024">2024 (A4)</option>
        <option value="2025">2025 (A5)</option>
      </select>
      <Suspense fallback={<p />}>
        <div class="flex flex-col justify-center items-center">
          <div class="mx-auto  grid grid-cols-4 gap-2">
            <For each={localStudents()}>
              {(student) => (
                <div class="m-2">
                  <StudentITem student={student} />
                </div>
              )}
            </For>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default StudentList;
