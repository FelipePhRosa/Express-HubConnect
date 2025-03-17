"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const DeleteUserService_1 = require("../services/DeleteUserService");
class DeleteUserController {
    async handle(request, reply) {
        const { id } = request.query;
        const userService = new DeleteUserService_1.DeleteUserService();
        const user = await userService.execute({ id });
        reply.send(user);
    }
}
exports.DeleteUserController = DeleteUserController;
