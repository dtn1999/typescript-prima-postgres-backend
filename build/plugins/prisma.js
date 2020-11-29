"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaPlugin = {
    name: 'app/prisma',
    register: async (server) => {
        const prisma = new client_1.PrismaClient();
        server.app.prisma = prisma;
        server.ext({
            type: 'onPostStop',
            method: async (serverReq) => {
                await serverReq.app.prisma.$disconnect();
            },
        });
    },
};
exports.default = prismaPlugin;
//# sourceMappingURL=prisma.js.map