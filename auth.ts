import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";





  export const { 
    auth, 
    handlers, 
    signIn, 
    signOut } 
    = NextAuth({ 
      pages: {
        signIn: "/auth/login",
        error: "/auth/error"
      },
      events: { 
        async linkAccount({ user }) {
          await db.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
            })
          }
      },
      callbacks:{
        async signIn({ user, account }) {
          console.log("SignIn callback called with user:", user, "and account:", account);
          // allow OAuth without email verification
            if (account?.provider !== "credentials") 
            return true;
            if (!user.id) return false;
            const existingUser = await getUserById(user.id);
            //Prevent sign in without email verification for credentials provider
            if (!existingUser?.emailVerified) {
               return false;
            }
            //TODO : add 2FA check here
          return true;
        },

        async session({token, session}){
          if(token.sub && session.user){
            session.user.id = token.sub
          }
          if (token.role && session.user) {
            session.user.role = token.role as UserRole;
          }
          return session;
        },
        async jwt ({token}){
          
          if (!token.sub) return token;
          
          const existingUser = await getUserById(token.sub)

          if (!existingUser) return token;

          token.role = existingUser.role;

          return token;
         } 
      },
      adapter: PrismaAdapter(db),
      session: { strategy: "jwt" },
      ...authConfig,
    }); 