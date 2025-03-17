"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../src/prisma"));
class CreateUserService {
    async execute({ name, email, password }) {
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: { email }
        });
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
        if (!name || !email || !password) {
            throw new Error("Information Incomplete.");
        }
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password,
            }
        });
        return user;
    }
}
exports.CreateUserService = CreateUserService;
