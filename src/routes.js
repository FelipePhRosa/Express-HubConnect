"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const CreateUserController_1 = require("./controllers/CreateUserController");
const ListUserController_1 = require("./controllers/ListUserController");
const DeleteUserController_1 = require("./controllers/DeleteUserController");
const CreateStoreController_1 = require("./controllers/CreateStoreController");
const ListStoreController_1 = require("./controllers/ListStoreController");
const login_1 = require("./login");
const auth_1 = require("./auth");
async function routes(fastify, options) {
    // Registrando a função de login
    (0, login_1.login)(fastify);
    fastify.get("/", async (request, reply) => {
        return { hello: "world" };
    });
    fastify.post("/user", async (request, reply) => {
        return new CreateUserController_1.CreateUserController().handle(request, reply);
    });
    // Rota protegida com autenticação
    fastify.get("/users", async (request, reply) => {
        return new ListUserController_1.ListUserController().handle(request, reply);
    });
    // Rota protegida com autenticação
    fastify.delete("/user", {
        preHandler: auth_1.authenticate
    }, async (request, reply) => {
        return new DeleteUserController_1.DeleteUserController().handle(request, reply);
    });
    // Rota protegida com autenticação para criar loja
    fastify.post("/store", {
        preHandler: auth_1.authenticate
    }, async (request, reply) => {
        return new CreateStoreController_1.CreateStoreController().handle(request, reply);
    });
    // Rota para listar todas as lojas
    fastify.get("/stores", async (request, reply) => {
        return new ListStoreController_1.ListStoresController().handle(request, reply);
    });
}
