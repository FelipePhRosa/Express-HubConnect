import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export class ListStoresController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Busca todas as lojas
      const stores = await prisma.store.findMany({
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
    } catch (error) {
      console.error("Error fetching stores:", error);
      return reply.status(500).send({ error: "Error fetching stores" });
    }
  }
}