import type { Student } from "@prisma/client";

export default (props: { student: Student }) => {
  return (
    <div class="bg-slate-800 w-56 h-64 rounded-md flex flex-col justify-center items-center">
      <div class="mb-2 rounded-full w-14 h-14 bg-slate-700 flex justify-center items-center">
        <p class="text-slate-300 uppercase font-medium ">
          {props.student.firstname[0]}
          {props.student.firstname[1]}
        </p>
      </div>
      <h1 class="text-xl font-semibold text-white">
        {props.student.firstname} {props.student.lastname}
      </h1>
      <h2 class="text-xs font-semibold text-slate-500">
        {props.student.email}
      </h2>
    </div>
  );
};
