"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const usersPlugin = {
    name: 'app/users',
    dependencies: ['app/prisma'],
    register: (server) => {
        server.route([
            // Post: create user route
            {
                method: 'POST',
                path: '/users',
                handler: controllers_1.usersContoller.createUserHandler,
            },
            // Get: get user by id route
            {
                method: 'GET',
                path: '/users/{userId}',
                handler: controllers_1.usersContoller.getUserByIdHandler,
            },
            // Get: get all users route
            {
                method: 'GET',
                path: '/users',
                handler: controllers_1.usersContoller.getUserAllHandler,
            },
            // Put: update existing user by id
            // Delete: delete existing user by id route
            {
                method: 'DELETE',
                path: '/users/{userId}',
                handler: controllers_1.usersContoller.deleteUserByIdHandler,
            },
        ]);
    },
};
exports.default = usersPlugin;
//# sourceMappingURL=user.js.map