import { createServerData$ } from "solid-start/server";
import { authOpts } from "./api/auth/[...solidauth]";
import { getSession } from "@auth/solid-start";

export default function Me() {
  const user = createServerData$(async (_, { request }) => {
    return (await getSession(request, authOpts))?.user;
  });
  return <div>Mon profil</div>;
}
