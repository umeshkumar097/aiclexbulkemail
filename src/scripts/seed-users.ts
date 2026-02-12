import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = "admin@admin.com";
    const adminPassword = "admin123";
    const userEmail = "user@user.com";
    const userPassword = "user123";

    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
    const hashedUserPassword = await bcrypt.hash(userPassword, 10);

    // Create or Update Admin
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedAdminPassword,
            role: Role.ADMIN, // or SUPER_ADMIN if needed
            name: "Admin User",
        },
        create: {
            email: adminEmail,
            password: hashedAdminPassword,
            role: Role.ADMIN,
            name: "Admin User",
        },
    });

    console.log({ admin });

    // Create or Update User
    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {
            password: hashedUserPassword,
            role: Role.USER,
            name: "Normal User",
        },
        create: {
            email: userEmail,
            password: hashedUserPassword,
            role: Role.USER,
            name: "Normal User",
        },
    });

    console.log({ user });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
