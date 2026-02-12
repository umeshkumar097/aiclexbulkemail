import { Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: Role;
    id: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
