"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaPlugin = exports.usersPlugin = exports.apiStatusPlugin = void 0;
const api_status_1 = __importDefault(require("./api-status"));
exports.apiStatusPlugin = api_status_1.default;
const user_1 = __importDefault(require("./user"));
exports.usersPlugin = user_1.default;
const prisma_1 = __importDefault(require("./prisma"));
exports.prismaPlugin = prisma_1.default;
//# sourceMappingURL=index.js.map