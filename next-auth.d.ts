import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    // Add any custom session properties here
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Add any custom JWT properties here
  }
}
