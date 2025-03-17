"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class StoreService {
    async createStore(name, ownerId, description) {
        const owner = await prisma.user.findUnique({ where: { id: ownerId } });
        if (!owner) {
            throw new Error("Usuário não encontrado");
        }
        const store = await prisma.store.create({
            data: {
                name,
                ownerId,
                description,
            },
        });
        return store;
    }
}
exports.StoreService = StoreService;
