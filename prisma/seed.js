import { prisma } from '../services/db.js';
import { createHash } from 'crypto';

async function main() {
    const password = createHash('sha1')
        .update('admin' + process.env.SALT)
        .digest('hex');
    await prisma.utilisateur.upsert({
        where: { mail: 'admin@admin.com' },
        update: {},
        create: {
            mail: 'admin@admin.com',
            password,
            role: 'admin',
        },
    });
    console.log('Admin user seeded');
    await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
