import type { Student } from "@prisma/client";
import type { ParentComponent } from "solid-js";
import { Component, For } from "solid-js";

type StudentListProps = {
  students: Student[];
};

const StudentList: ParentComponent<StudentListProps> = (props) => {
  return (
    <div class="flex flex-col justify-center">
      <div class="text-2xl font-bold text-gray-100">Students</div>
      <div class="flex flex-col  ">
        <For each={props.students}>{(student) => (
          <div class="flex flex-row items-center">
            <div class="text-xl font-bold text-gray-100">
              {student.firstname} {student.lastname}
            </div>
            <div class="text-xl font-bold text-gray-100">
              {student.email}
            </div>
          </div>
        )}</For>
      </div>
    </div>
  );

}

export default StudentList;
