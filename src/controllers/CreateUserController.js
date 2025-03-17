"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
class CreateUserController {
    async handle(request, reply) {
        const createUserSchema = zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6),
        });
        const { name, email, password } = createUserSchema.parse(request.body);
        // Verifica se o usuário já existe
        const userExists = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return reply.status(400).send({ error: "User already exists" });
        }
        // Cria o usuário com a senha sem hash
        const user = await prisma_1.prisma.user.create({
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
exports.CreateUserController = CreateUserController;
