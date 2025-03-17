"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const prisma_1 = require("./lib/prisma");
const zod_1 = __importDefault(require("zod"));
function login(app) {
    const loginSchema = zod_1.default.object({
        email: zod_1.default.string().email(),
        password: zod_1.default.string(),
    });
    app.post("/login", async (req, res) => {
        const { email, password } = loginSchema.parse(req.body);
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
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
            expiresIn: '7d' // Token expira em 7 dias
        });
        return res.status(200).send({ token });
    });
}
