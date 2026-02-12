import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const email = "admin@admin.com";

    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: "SUPER_ADMIN" }
        });
        console.log(`Updated ${user.email} to ${user.role}`);
    } catch (e) {
        console.error("Error updating user:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
