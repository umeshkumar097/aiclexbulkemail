
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // 1. Create Plans
    const plans = [
        {
            name: 'Free',
            description: 'Perfect for getting started',
            price: 0,
            monthlyEmailLimit: 1000,
            features: { leadScoring: false, apiAccess: false, support: 'community' }
        },
        {
            name: 'Pro',
            description: 'For growing businesses',
            price: 29,
            monthlyEmailLimit: 10000,
            features: { leadScoring: true, apiAccess: true, support: 'email' }
        },
        {
            name: 'Enterprise',
            description: 'For large scale operations',
            price: 99,
            monthlyEmailLimit: 50000,
            features: { leadScoring: true, apiAccess: true, support: 'priority' }
        }
    ]

    for (const plan of plans) {
        await prisma.plan.upsert({
            where: { name: plan.name },
            update: {},
            create: plan,
        })
    }

    // 2. Global Settings
    await prisma.globalSettings.upsert({
        where: { id: 'settings' },
        update: {},
        create: {
            companyName: 'Aiclex Mail',
            primaryColor: '#000000',
            maintenanceMode: false,
        }
    })

    // 3. Super Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@aiclex.com' },
        update: { role: Role.SUPER_ADMIN },
        create: {
            email: 'admin@aiclex.com',
            name: 'Super Admin',
            password: hashedPassword,
            role: Role.SUPER_ADMIN,
        }
    })

    console.log({ admin })
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
