import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firebaseCert } from "./firebase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook],
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
});
