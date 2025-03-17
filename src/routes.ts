import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListUserController } from "./controllers/ListUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { CreateStoreController } from "./controllers/CreateStoreController";
import { ListStoresController } from "./controllers/ListStoreController";
import { login } from "./login";
import { authenticate } from "./auth";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    // Registrando a função de login
    login(fastify);
    
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        return { hello: "world" }
    })

    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply)
    })

    // Rota protegida com autenticação
    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUserController().handle(request, reply)
    })

    // Rota protegida com autenticação
    fastify.delete("/user", {
        preHandler: authenticate
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUserController().handle(request, reply)
    })

    // Rota protegida com autenticação para criar loja
    fastify.post("/store", {
        preHandler: authenticate
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateStoreController().handle(request, reply)
    })
    
    // Rota para listar todas as lojas
    fastify.get("/stores", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListStoresController().handle(request, reply)
    })
}