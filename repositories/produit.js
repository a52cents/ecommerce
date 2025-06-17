import { prisma } from "../services/db.js";

export const produitRepository = {
    getProducts: async (page, limit) => {
        return prisma.produit.findMany({
            skip: (page - 1) * limit,
            take: limit
        });
    },
    getProduct: async (id) => {
        const product = await prisma.produit.findUnique({
            where: { id: id }
        });
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    },
    createProduct: async (product) => {
        return prisma.produit.create({
            data: product
        });
    },
    editProduct: async (id, product) => {
        return prisma.produit.update({
            where: { id: id },
            data: product
        });
    },
    deleteProduct: async (id) => {
        return prisma.produit.delete({
            where: { id: id }
        });
    }
};