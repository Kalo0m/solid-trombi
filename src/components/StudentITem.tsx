/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { User } from "@prisma/client";
import { Show } from "solid-js";

export default (props: { student: User }) => {
  return (
    <div class="bg-slate-800  w-56 h-64 rounded-md flex flex-col justify-center items-center">
      <div class="mb-2 overflow-hidden rounded-full w-14 h-14 bg-slate-700 flex justify-center items-center">
        <Show
          when={props.student.image}
          fallback={
            <p class="text-slate-300 uppercase font-medium ">
              {props.student.firstname?.[0]}
              {props.student.firstname?.[1]}
            </p>
          }
        >
          <img class="w-full h-full bg-cover" src={props.student.image!} />
        </Show>
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
