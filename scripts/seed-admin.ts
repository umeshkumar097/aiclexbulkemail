const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
    const email = process.argv[2];

    if (!email) {
        console.error('Please provide an email address as an argument.');
        process.exit(1);
    }

    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.error(`User with email ${email} not found.`);
        process.exit(1);
    }

    await db.user.update({
        where: { email },
        data: { role: 'SUPER_ADMIN' },
    });

    console.log(`User ${email} has been promoted to SUPER_ADMIN.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
