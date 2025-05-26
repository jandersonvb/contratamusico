import NextAuth from "next-auth"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook],
  events: {
    signIn: async (message) => {
      console.log("signIn", message);
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "login", {
          method: message.account?.provider,
        });
      }
    },
    signOut: async () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "logout");
      }
    },
  },
});