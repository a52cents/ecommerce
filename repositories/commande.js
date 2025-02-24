import { prisma } from "../services/db.js";

export const commandeRepository = {
    getCommandes: async (page,limit) => {
        const commandes = prisma.commande.findMany({
            skip:(page - 1) * limit,
            take:limit
        });
        return commandes;
    },
    getCommande: async (id) => {
        const commande = prisma.commande.findUnique({
            where: { id: id }
        });
        if (!commande) {
            throw new Error("Commande not found");
        }
        return commande;
    },
    createCommande: async (commande) => {
        const newCommande = prisma.commande.create({
            data: commande
        });
        return newCommande;
    },
    editCommande: async (id,commande) => {
        const updatedCommande = prisma.commande.update({
            where: { id: id },
            data: commande
        });
        return updatedCommande;
    },
    deleteCommande: async (id) => {
        const deletedCommande = prisma.commande.delete({
            where: { id: id }
        });
        return deletedCommande;
    },
    getCommandesByUserId: async (userId) => {
        const commandes = prisma.commande.findMany({
            where: { utilisateurId: userId }
        });
        return commandes;
    }
}