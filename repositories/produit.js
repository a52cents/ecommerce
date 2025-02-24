import { prisma } from "../services/db.js";

export const produitRepository = {
    getProducts: async (page, limit) => {
        const products = prisma.produit.findMany({
            skip: (page - 1) * limit,
            take: limit
        });
        return products;
    },
    getProduct: async (id) => {
        const product = prisma.produit.findUnique({
            where: { id: id }
        });
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    },
    createProduct: async (product) => {
        const newProduct = prisma.produit.create({
            data: product
        });
        return newProduct;
    },
    editProduct: async (id, product) => {
        const updatedProduct = prisma.produit.update({
            where: { id: id },
            data: product
        });
        return updatedProduct;
    },
    deleteProduct: async (id) => {
        const deletedProduct = prisma.produit.delete({
            where: { id: id }
        });
        return deletedProduct;
    }
}