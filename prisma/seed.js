import { prisma } from '../services/db.js';
import { createHash } from 'crypto';

async function main() {
    // Seed admin
    const adminPassword = createHash('sha1')
        .update('admin' + process.env.SALT)
        .digest('hex');
    const admin = await prisma.utilisateur.upsert({
        where: { mail: 'admin@admin.com' },
        update: {},
        create: {
            mail: 'admin@admin.com',
            password: adminPassword,
            role: 'admin',
        },
    });

    // Seed user
    const userPassword = createHash('sha1')
        .update('user' + process.env.SALT)
        .digest('hex');
    const user = await prisma.utilisateur.upsert({
        where: { mail: 'user@user.com' },
        update: {},
        create: {
            mail: 'user@user.com',
            password: userPassword,
            role: 'user',
        },
    });

    // Seed produit
    const produit = await prisma.produit.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nom: 'Produit Test',
            prix: 1000,
        },
    });

    // Seed commande pour user
    const commande = await prisma.commande.create({
        data: {
            utilisateurId: user.id,
        },
    });

    // Seed commandeproduit pour la commande et le produit
    await prisma.commandeproduit.create({
        data: {
            commandeId: commande.id,
            produitId: produit.id,
            quantite: 2,
        },
    });

    console.log('Admin, user, produit, commande, commandeproduit seeded');
    await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
