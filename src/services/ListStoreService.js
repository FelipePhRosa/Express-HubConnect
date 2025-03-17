"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStoreService = void 0;
const prisma_1 = __importDefault(require("../../src/prisma"));
class ListStoreService {
    async execute() {
        const stores = await prisma_1.default.store.findMany();
        return stores;
    }
}
exports.ListStoreService = ListStoreService;
