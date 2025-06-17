const { produitRepository } = require("../repositories/produit.js");

describe("produitRepository", () => {
    test("getProducts retourne un tableau (mock)", async () => {
        produitRepository.getProducts = jest.fn().mockResolvedValue([
            { id: 1, nom: "Produit 1" },
            { id: 2, nom: "Produit 2" }
        ]);
        const produits = await produitRepository.getProducts(1, 2);
        expect(Array.isArray(produits)).toBe(true);
        expect(produits.length).toBe(2);
    });

    test("getProduct lève une erreur si non trouvé (mock)", async () => {
        produitRepository.getProduct = jest.fn().mockRejectedValue(new Error("Product not found"));
        await expect(produitRepository.getProduct(999)).rejects.toThrow("Product not found");
    });
});
