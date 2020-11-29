"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiStatusPlugin = {
    name: 'app/status',
    version: '1.0.0',
    register: async (server) => {
        // create a route to check if the server is actually running
        server.route({
            method: 'GET',
            path: '/status',
            handler: (request, h) => h.response({ up: true }).code(200),
        });
    },
    once: true,
};
exports.default = apiStatusPlugin;
//# sourceMappingURL=api-status.js.map