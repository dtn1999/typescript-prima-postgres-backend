"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const validations_1 = require("../validations");
exports.default = {
    /**
     * create new user
     */
    createUserHandler: async (request, h) => {
        const { prisma } = request.server.app;
        const payload = request.payload;
        const { error, errors } = validations_1.createUserPayloadSchema.validate(payload);
        console.log('error , errors', error, errors);
        if (error || errors) {
            return boom_1.default.badRequest('Make sure the data you gave in the payload of your request are correct');
        }
        try {
            const createdUser = await prisma.user.create({
                data: {
                    ...payload,
                },
            });
            console.log(createdUser);
            return h.response({ user: createdUser }).code(201);
        }
        catch (error) {
            console.log(error.message);
            return boom_1.default.badData('the user you want to create seems to already exist');
        }
    },
    /**
     * get user by his user id
     */
    getUserAllHandler: async (request, h) => {
        const { prisma } = request.server.app;
        try {
            const users = await prisma.user.findMany();
            return h.response({ users }).code(200);
        }
        catch (error) {
            console.error(error);
            return boom_1.default.badImplementation();
        }
    },
    /**
     * delete user based on his id
     */
    deleteUserByIdHandler: async (request, h) => {
        const { prisma } = request.server.app;
        const { params } = request;
        const { error, errors } = validations_1.UserIdParamSchema.validate(params);
        if (error || errors) {
            return boom_1.default.badRequest('Make sure the data you gave in the payload of your request are correct');
        }
        const userId = parseInt(params.userId, 10);
        try {
            await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
            return h.response().code(204);
        }
        catch (error) {
            return boom_1.default.badImplementation();
        }
    },
    /**
     * get user bases on his id
     */
    getUserByIdHandler: async (request, h) => {
        const { prisma } = request.server.app;
        const { params } = request;
        const { error, errors } = validations_1.UserIdParamSchema.validate(params);
        if (error || errors) {
            return boom_1.default.badRequest('Make sure the data you gave in the payload of your request are correct');
        }
        const userId = parseInt(params.userId, 10);
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            return h.response({ user }).code(200);
        }
        catch (error) {
            return boom_1.default.badImplementation();
        }
    },
};
//# sourceMappingURL=users.js.map