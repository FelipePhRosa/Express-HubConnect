import fastify from 'fastify';
import { routes } from './routes';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { authenticate } from "./auth";
import dotenv from 'dotenv';

const server = fastify({ logger: true });
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET); 

const start = async () => {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in .env file");
    }

    server.setErrorHandler((error, request, reply) => {
        reply.code(400).send({ message: error.message });
    });

    await server.register(cors);

    // Registrando o plugin JWT com a verificação
    await server.register(jwt, {
        secret: jwtSecret
    });

    server.decorate("authenticate", authenticate);

    await server.register(routes);

    try {
        await server.listen({ port: 5173 });
    } catch (error) {
        process.exit(1);
    }
};

start();
