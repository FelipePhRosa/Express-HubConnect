import { FastifyRequest, FastifyReply } from "fastify";
import { ListProductService } from "../services/ListProductService";

class ListProductController{
    async handle(request: FastifyRequest, reply: FastifyReply){

        const listProductService = new ListProductService();

        const store = await listProductService.execute();

        reply.send(store)


    }
}

export { ListProductController }