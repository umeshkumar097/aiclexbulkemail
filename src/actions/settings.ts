"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return { error: "Unauthorized" };
    }

    if (!user.id) {
        return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" };
    }

    // Password change logic
    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);

        if (!passwordsMatch) {
            return { error: "Incorrect current password!" };
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    // Remove sensitive/unused fields before update
    // We map manually to be safe
    await db.user.update({
        where: { id: dbUser.id },
        data: {
            name: values.name,
            // email: values.email, // changing email requires verification usually
            password: values.password,
            // isTwoFactorEnabled: values.isTwoFactorEnabled,
            role: values.role
        }
    });

    return { success: "Settings Updated!" };
};
