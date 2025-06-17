import { prisma } from "../services/db.js";

export const commandeRepository = {
    getCommandes: async (page, limit) => {
        return prisma.commande.findMany({
            skip: (page - 1) * limit,
            take: limit
        });
    },
    getCommande: async (id) => {
        const commande = await prisma.commande.findUnique({
            where: { id: id }
        });
        if (!commande) {
            throw new Error("Commande not found");
        }
        return commande;
    },
    createCommande: async (commande) => {
        return prisma.commande.create({
            data: commande
        });
    },
    editCommande: async (id, commande) => {
        return prisma.commande.update({
            where: { id: id },
            data: commande
        });
    },
    deleteCommande: async (id) => {
        return prisma.commande.delete({
            where: { id: id }
        });
    },
    getCommandesByUserId: async (userId) => {
        return prisma.commande.findMany({
            where: { utilisateurId: userId }
        });
    }
};