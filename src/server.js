"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const server = (0, fastify_1.default)({ logger: true });
const start = async () => {
    server.setErrorHandler((error, request, reply) => {
        reply.code(400).send({ message: error.message });
    });
    await server.register(cors_1.default);
    // Registrando o plugin JWT
    await server.register(jwt_1.default, {
        secret: 'secretkey' // Melhor usar variável de ambiente em produção
    });
    await server.register(routes_1.routes);
    const port = process.env.PORT || 3333; // Usando a porta configurada pelo Render ou uma padrão
        fastify_1.listen(port, '0.0.0.0', (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
};
start();
