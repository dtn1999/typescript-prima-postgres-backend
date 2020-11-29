"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("../controllers");
var usersPlugin = {
    name: 'app/users',
    dependencies: ['app/prisma'],
    register: function (server) {
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
