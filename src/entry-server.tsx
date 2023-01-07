import { getSession } from "@auth/solid-start";
import { redirect } from "solid-start";

import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";
import { authOpts } from "./routes/api/auth/[...solidauth]";

const protectedPaths = ["/", "/me"]; // add any route you wish in here
export default createHandler(
  ({ forward }) => {
    return async (event) => {
      if (protectedPaths.includes(new URL(event.request.url).pathname)) {
        const user = await getSession(event.request, authOpts);
        if (!user) {
          return redirect("/login"); // a page for a non logged in user
        }
      }
      return forward(event); // if we got here, and the pathname is inside the `protectedPaths` array - a user is logged in
    };
  },
  renderAsync((event) => <StartServer event={event} />)
);
