import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class StoreService {
    async createStore(name: string, ownerId: string, description: string) {
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
