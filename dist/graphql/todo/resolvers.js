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
const client_1 = __importDefault(require("../../client"));
const queries = {};
const mutations = {
    createTodo: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todo = yield client_1.default.todo.create({
                data: {
                    title: payload.title,
                    userId: context.user.id,
                    completed: false,
                },
            });
            return todo;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }),
};
exports.resolvers = { queries, mutations };
