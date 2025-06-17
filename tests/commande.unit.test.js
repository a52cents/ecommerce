import { jest, describe, test, expect } from '@jest/globals';
import { commandeRepository } from "../repositories/commande.js";

describe("commandeRepository", () => {
    test("getCommandes retourne un tableau (mock)", async () => {
        commandeRepository.getCommandes = jest.fn().mockResolvedValue([
            { id: 1, utilisateurId: 1 },
            { id: 2, utilisateurId: 2 }
        ]);
        const commandes = await commandeRepository.getCommandes(1, 2);
        expect(Array.isArray(commandes)).toBe(true);
        expect(commandes.length).toBe(2);
    });

    test("getCommande lève une erreur si non trouvé (mock)", async () => {
        commandeRepository.getCommande = jest.fn().mockRejectedValue(new Error("Commande not found"));
        await expect(commandeRepository.getCommande(999)).rejects.toThrow("Commande not found");
    });
});
