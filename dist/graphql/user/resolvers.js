"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = __importDefault(require("../../services/user"));
const queries = {
    login: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield user_1.default.login({
            email: payload.email,
            password: payload.password,
        });
        return token;
    }),
    profile: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            return yield user_1.default.getUserById(context.user.id);
        }
        throw new Error('Please Login to Access...');
    })
};
const mutations = {
    register: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_1.default.register(payload);
        return "Registration Successfully...";
    }),
};
exports.resolvers = { queries, mutations };