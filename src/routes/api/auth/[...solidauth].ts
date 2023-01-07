import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
import Github from "@auth/core/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { serverEnv } from "~/env/server";
import { prisma } from "~/server/db/client";
import { AdapterUser } from "@auth/core/adapters";
import GoogleProvider from "@auth/core/providers/google";
import { redirect } from "solid-start";

export const authOpts: SolidAuthConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore types error
    Github({
      clientId: serverEnv.GITHUB_ID,
      clientSecret: serverEnv.GITHUB_SECRET,
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore types error
    GoogleProvider({
      
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET
    })
  ],

  session: {
    strategy: "database",
    generateSessionToken: () => {
      return crypto.randomUUID();
    },
  },
  debug: false,
  callbacks: {
    
    session: async ({ session, user }) => {
      session.user = user;
      console.log(user)
      console.log(session)
      return Promise.resolve(session);
    },
    jwt: async (attrs) => {
      console.log(attrs)
      return Promise.resolve(attrs);
    },
    
  },
  
 
};

export const { GET, POST } = SolidAuth(authOpts);
