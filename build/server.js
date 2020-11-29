"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.createServer = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const plugins_1 = require("./plugins");
async function createServer() {
    console.log('Server is Starting ...');
    const server = hapi_1.default.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
    });
    await server.register([
        plugins_1.apiStatusPlugin,
        plugins_1.prismaPlugin,
        plugins_1.usersPlugin,
    ], {
        routes: {
            prefix: '/api',
        },
    });
    await server.initialize();
    return server;
}
exports.createServer = createServer;
async function startServer(server) {
    await server.start();
    console.log(`🚀 server has started on location : ${server.info.uri}`);
    return server;
}
exports.startServer = startServer;
process.on('unhandledRejection', (error) => {
    console.error('Server has failled to start ', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map