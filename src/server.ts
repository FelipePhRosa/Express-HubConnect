import fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { VercelRequest, VercelResponse } from "@vercel/node"; // Importa os tipos da Vercel

const server = fastify({ logger: true });

server.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

server.register(cors);

// Registrando o plugin JWT
server.register(jwt, {
  secret: process.env.JWT_SECRET || "secretkey", // Usa variável de ambiente na produção
});

server.register(routes);

// Exportando Fastify corretamente para a Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  await server.ready();
  server.server.emit("request", req, res);
};
