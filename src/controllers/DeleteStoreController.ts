import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteStoreService } from "../services/DeleteStoreService";

class DeleteStoreController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        // Pegando o parâmetro da URL (storeId)
        const { storeId } = request.params as { storeId: string };

        // Pegando o ownerId a partir do usuário autenticado (request.user.id)
        const ownerId = request.user.id;

        // Chamando o serviço de exclusão
        const storeService = new DeleteStoreService();

        const response = await storeService.execute({ storeId, ownerId });

        reply.send(response);
    }
}

export { DeleteStoreController };
