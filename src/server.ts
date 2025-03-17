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
        secret: 'secretkey' // Melhor usar variável de ambiente em produção
    });
    
    await server.register(routes);
    
    try{
        await server.listen({ port: 5173 });
    }catch(error){
        process.exit(1);
    }
}

start();