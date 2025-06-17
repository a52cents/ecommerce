import { produitRepository } from "../repositories/produit.js";
import { prisma } from "../services/db.js";

describe("produitRepository (integration)", () => {
    beforeAll(async () => {
        // Nettoyage de la table produit (si possible)
        await prisma.produit.deleteMany();
    });

    test("createProduct ajoute un produit", async () => {
        const produit = await produitRepository.createProduct({ nom: "Test", prix: 10 });
        expect(produit).toHaveProperty("id");
        expect(produit.nom).toBe("Test");
    });

    test("getProducts retourne au moins 1 produit", async () => {
        const produits = await produitRepository.getProducts(1, 10);
        expect(produits.length).toBeGreaterThan(0);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});
