import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
import Github from "@auth/core/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { serverEnv } from "~/env/server";
import { prisma } from "~/server/db/client";
import { AdapterUser } from "@auth/core/adapters";
import GoogleProvider from "@auth/core/providers/google";
import { redirect } from "solid-start";
import FacebookProvider from "@auth/core/providers/facebook";

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
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore types error
    FacebookProvider({
      clientId: serverEnv.FACEBOOK_CLIENT_ID,
      clientSecret: serverEnv.FACEBOOK_CLIENT_SECRET
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
      return Promise.resolve(session);
    },
    jwt: async (attrs) => {
      return Promise.resolve(attrs);
    },
    async redirect({ url, baseUrl }) {
      console.log(baseUrl, url)
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
};

export const { GET, POST } = SolidAuth(authOpts);
