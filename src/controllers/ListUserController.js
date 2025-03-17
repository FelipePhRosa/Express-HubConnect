"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserController = void 0;
const ListUserService_1 = require("../services/ListUserService");
class ListUserController {
    async handle(request, reply) {
        const listUserService = new ListUserService_1.ListUserService();
        const users = await listUserService.execute();
        reply.send(users);
    }
}
exports.ListUserController = ListUserController;
