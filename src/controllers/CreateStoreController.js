"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStoreController = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
class CreateStoreController {
    async handle(request, reply) {
        try {
            // Extrai o usuário do token JWT
            const user = request.user;
            const createStoreSchema = zod_1.z.object({
                name: zod_1.z.string(),
                urlimage: zod_1.z.string().url().optional(),
                description: zod_1.z.string()
            });
            const { name, urlimage, description } = createStoreSchema.parse(request.body);
            // Cria a loja com as informações básicas
            const store = await prisma_1.prisma.store.create({
                data: {
                    name,
                    urlimage: urlimage || null,
                    description,
                    ownerId: user.id,
                },
            });
            return reply.status(201).send({
                id: store.id,
                name: store.name,
                urlimage: store.urlimage,
                description: store.description,
                ownerId: store.ownerId,
            });
        }
        catch (error) {
            return reply.status(400).send({ error: "Error creating store" });
        }
    }
}
exports.CreateStoreController = CreateStoreController;
