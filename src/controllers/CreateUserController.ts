import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserSchema.parse(request.body);

    // Verifica se o usuário já existe
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return reply.status(400).send({ error: "User already exists" });
    }

    // Cria o usuário com a senha sem hash
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Senha direta sem hash
      },
    });

    // Retorna o usuário criado sem expor a senha
    return reply.status(201).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}