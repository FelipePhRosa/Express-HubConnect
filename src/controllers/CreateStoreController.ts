import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export class CreateStoreController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Extrai o usuário do token JWT
      const user = request.user;

      const createStoreSchema = z.object({
        name: z.string(),
        urlimage: z.string().url().optional(),
        description: z.string()
      });

      const { name, urlimage, description } = createStoreSchema.parse(request.body);

      // Cria a loja com as informações básicas
      const store = await prisma.store.create({
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
    } catch (error) {
      return reply.status(400).send({ error: "Error creating store" });
    }
  }
}