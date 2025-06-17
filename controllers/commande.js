import { CreateCommandeDto, listCommandeDto } from "../dtos/CommandeDtos.js";
import { commandeRepository } from "../repositories/commande.js";
import { produitRepository } from "../repositories/produit.js";

export function registerCommandeRoutes(fastify) {
    fastify.post("/commandes", { preHandler: fastify.auth([fastify.authUser]), schema: CreateCommandeDto }, async (request, reply) => {
        try {
            const { produits } = request.body;
            // Validate produitId
            for (const produit of produits) {
                const existingProduit = await produitRepository.getProduct(produit.id);
                if (!existingProduit) {
                    reply.code(400).send({ message: `Produit with id ${produit.id} does not exist` });
                    return;
                }
            }
            const commande = await commandeRepository.createCommande({
                utilisateurId: request.user.id,
                commandeproduit: {
                    create: produits.map(produit => ({
                        produitId: produit.id,
                        quantite: 1 // quantité de base 1 pour chaque produit envoyé
                    }))
                }
            });
            reply.code(201).send(commande);
        } catch (err) {
            console.error('Erreur création commande:', err); // LOG SERVEUR
            reply.code(500).send({ message: err.message });
        }
    });
    fastify.get("/commandes", { preHandler: fastify.auth([fastify.authUser]), schema: listCommandeDto }, async (request, reply) => {
        try {
            const userId = request.user.id;
            const commandes = await commandeRepository.getCommandesByUserId(userId);
            reply.code(200).send(commandes);
        } catch (err) {
            reply.code(500).send({ message: err.message });
        }
    });
}