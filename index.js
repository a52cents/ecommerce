import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import FastifyAuth from "@fastify/auth";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { registerAuthRoutes } from "./controllers/auth.js";
import { registerAuthMiddlewares } from "./middleware/auth.js";
import { registerAdminMiddlewares } from "./middleware/admin.js";
import { registerPostRoutes } from "./controllers/produit.js";
import { registerCommandeRoutes } from "./controllers/commande.js";
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const fastify = Fastify({ logger: true });

await fastify.register(fastifyCors, {
  origin: "*", // allow all
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

await fastify.register(fastifySwagger, {
  openapi: {
    components: {
      securitySchemes: {
        token: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  }
});

await fastify.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list'
  }
});

// Register the fastify-auth plugin
await fastify.register(FastifyAuth);

// Register middlewares before routes
registerAuthMiddlewares(fastify);
registerAdminMiddlewares(fastify);

// Register routes
registerCommandeRoutes(fastify);
registerAuthRoutes(fastify);
registerPostRoutes(fastify);

// Serve index.html at '/'
fastify.get('/', async (request, reply) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const html = await readFile(path.join(__dirname, 'index.html'), 'utf-8');
    reply.type('text/html').send(html);
});

try {
  await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
  fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  await fastify.ready();
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}