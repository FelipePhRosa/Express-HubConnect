import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";
import { hashPassword } from "../utils/hash";

export function createUser(app: FastifyInstance) {
    
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8, "passoword much wrong"),
    })
    
    app.post("/user", async (req, res) => {
        const { name, email, password } = createUserSchema.parse(req.body);

        const existeUser = await prisma.user.findUnique({
            where: { email },
        });
        
        if (existeUser) {
            return res.status(400).send({ error: "User already exists." });
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        })

        return res.status(201).send(user);
    })
}