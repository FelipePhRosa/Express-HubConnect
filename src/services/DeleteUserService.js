"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserService = void 0;
const prisma_1 = __importDefault(require("../../src/prisma"));
class DeleteUserService {
    async execute({ id }) {
        if (!id) {
            throw new Error("Invalid Request.");
        }
        const findUser = await prisma_1.default.user.findFirst({
            where: {
                id: id
            }
        });
        if (!findUser) {
            throw new Error("User not found.");
        }
        await prisma_1.default.user.delete({
            where: {
                id: findUser.id
            }
        });
        return { message: "User deleted successfully." };
    }
}
exports.DeleteUserService = DeleteUserService;
