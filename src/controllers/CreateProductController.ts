import prismaClient from "../../src/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { CreateProductService } from "../services/CreateProductService";
import { StoreProductParams } from "../interface/StoreProductParams";

export class CreateProductController {
    async handle(request: FastifyRequest<StoreProductParams>, reply: FastifyReply) {
        try {
            const user = request.user;
            console.log("Usuário autenticado:", user);
            console.log("Dados do request:", request.body);

            const { storeId } = request.params;
            
            const CreateProductSchema = z.object({
                name: z.string(),
                description: z.string().optional(),
                price: z.number(),
                urlImage: z.string().url()
            });

            const { name, description, price, urlImage } = CreateProductSchema.parse(request.body);
            const createProductService = new CreateProductService();
            const product = await createProductService.createProduct({
                name,
                description,
                price,
                urlImage,
                ownerId: user.id,
                storeId
            });

            console.log("Produto criado com sucesso:", product);

            return reply.code(201).send(product);
        } catch (error) {
            console.error("Erro ao criar produto:", error);

            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }

            return reply.status(400).send({ error: "Error creating product" });
        }
    }
}
