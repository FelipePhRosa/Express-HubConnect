import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import z from "zod";

export function login(app: FastifyInstance) {
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    app.post("/login", async (req, res) => {
        const {email, password} = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if(!user) {
            return res.status(400).send({ error: "User not found" });
        }

        // Verificação simples de senha, sem usar hash
        const isPassword = password === user.password;

        if (!isPassword) {
            return res.status(400).send({ error: "incorrect password" });
        }

        const token = app.jwt.sign({
            id: user.id,
            email: user.email
        }, {
            expiresIn: '12h'
        });

        return res.status(200).send({ token });
    })
}
