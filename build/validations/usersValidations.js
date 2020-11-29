"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdParamSchema = exports.createUserPayloadSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const createUserPayloadSchema = joi_1.default.object().keys({
    lastName: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    social: joi_1.default.object({
        facebook: joi_1.default.string().optional(),
        tweeter: joi_1.default.string().optional(),
        tiktok: joi_1.default.string().optional(),
        website: joi_1.default.string().uri().optional(),
        github: joi_1.default.string().optional(),
    }).optional(),
});
exports.createUserPayloadSchema = createUserPayloadSchema;
const UserIdParamSchema = joi_1.default.object({
    userId: joi_1.default.string().pattern(/^\d+$/),
});
exports.UserIdParamSchema = UserIdParamSchema;
//# sourceMappingURL=usersValidations.js.map