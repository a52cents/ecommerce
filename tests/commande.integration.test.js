import { commandeRepository } from "../repositories/commande.js";
import { prisma } from "../services/db.js";

describe("commandeRepository (integration)", () => {
    let user;
    beforeAll(async () => {
        user = await prisma.utilisateur.create({
            data: { mail: "test@commande.com", password: "1234", role: "user" }
        });
        await prisma.commande.deleteMany();
    });

    test("createCommande ajoute une commande", async () => {
        const commande = await commandeRepository.createCommande({ utilisateurId: user.id });
        expect(commande).toHaveProperty("id");
        expect(commande.utilisateurId).toBe(user.id);
    });

    test("getCommandes retourne au moins 1 commande", async () => {
        const commandes = await commandeRepository.getCommandes(1, 10);
        expect(commandes.length).toBeGreaterThan(0);
    });

    afterAll(async () => {
        await prisma.commande.deleteMany();
        await prisma.utilisateur.delete({ where: { id: user.id } });
        await prisma.$disconnect();
    });
});
