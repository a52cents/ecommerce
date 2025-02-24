import { CreateProductDto, DeleteProductDto, GetProductDto, GetProductsDto } from "../dtos/ProduitDtos.js";
import { produitRepository } from "../repositories/produit.js";

export function registerPostRoutes(fastify) {
    fastify.post("/produits",{preHandler: fastify.auth([fastify.authAdmin]),schema:CreateProductDto}, async (request, reply) => {
        try {
            const product = await produitRepository.createProduct(request.body);
            reply.code(201).send(product);
        } catch (err) {
            reply.code(500).send({ message: err.message });
        }
    });
    fastify.get("/produits",{schema:GetProductsDto}, async (request, reply) => {
        try {
            const page = request.query.page || 1;
            const limit = request.query.limit || 10;
            const products = await produitRepository.getProducts(page, limit);
            reply.send(products);
        } catch (err) {
            reply.code(500).send({ message: err.message });
        }
    });
    fastify.get("/produits/:id",{schema:GetProductDto}, async (request, reply) => {
        try {
            const product = await produitRepository.getProduct(request.params.id);
            reply.send(product);
        } catch (err) {
            reply.code(509).send({ message: err.message+"111"});
        }
    });
    fastify.put("/produits/:id",{preHandler: fastify.auth([fastify.authAdmin]),schema:CreateProductDto}, async (request, reply) => {
        try {
            const productId = parseInt(request.params.id, 10);
            const product = await produitRepository.editProduct(productId, request.body);
            reply.send(product);
        } catch (err) {
            reply.code(500).send({ message: err.message });
        }
    });
    fastify.delete("/produits/:id",{preHandler: fastify.auth([fastify.authAdmin]),schema:DeleteProductDto}, async (request, reply) => {
        try {
            const productID = parseInt(request.params.id, 10);
            await produitRepository.deleteProduct(productID);
            reply.code(204).send();
        } catch (err) {
            reply.code(500).send({ message: err.message });
        }
    });
}