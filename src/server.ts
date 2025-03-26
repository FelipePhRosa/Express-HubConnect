import fastify from 'fastify';
import { routes } from './routes';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

const server = fastify({ logger: true});

const start = async () => {

    server.setErrorHandler((error, request, reply) => {
        reply.code(400).send({ message: error.message });
    })

    await server.register(cors);
    
    // Registrando o plugin JWT
    await server.register(jwt, {
        secret: "a63960c60be1671d2f16ec1d8454f005fe7225996716e70a5cc369d901280ea3"
    });
    
    await server.register(routes);
    
    try{
        await server.listen({ port: 5173 });
    }catch(error){
        process.exit(1);
    }
}

start();