"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStoresController = void 0;
const prisma_1 = require("../lib/prisma");
class ListStoresController {
    async handle(request, reply) {
        try {
            // Busca todas as lojas
            const stores = await prisma_1.prisma.store.findMany({
                select: {
                    id: true,
                    name: true,
                    urlimage: true,
                    createdAt: true,
                    ownerId: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                }
            });
            return reply.status(200).send(stores);
        }
        catch (error) {
            console.error("Error fetching stores:", error);
            return reply.status(500).send({ error: "Error fetching stores" });
        }
    }
}
exports.ListStoresController = ListStoresController;
