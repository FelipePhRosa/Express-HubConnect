import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteStoreService } from "../services/DeleteStoreService";

class DeleteStoreController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Pegando storeId do corpo da requisição
            const { storeId } = request.body as { storeId: string };

            // Pegando ownerId do usuário autenticado (vem do middleware de autenticação)
            const ownerId = request.user?.id; // Assumindo que `request.user` contém o usuário autenticado

            if (!ownerId) {
                return reply.status(401).send({ error: "Unauthorized" });
            }

            const deleteStoreService = new DeleteStoreService();
            const result = await deleteStoreService.execute({ storeId, ownerId });

            return reply.status(200).send(result);
        } catch (error: any) {
            return reply.status(400).send({ error: error.message });
        }
    }
}

export { DeleteStoreController };
