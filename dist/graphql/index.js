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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const user_1 = require("./user");
const todo_1 = require("./todo");
const GraphQLServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create GraphQL Server
    const typeDefs = `
        ${user_1.User.typeDefs}
        ${todo_1.Todo.typeDefs}
        type Query{
            ${user_1.User.queries}
            ${todo_1.Todo.queries}
        }
        type Mutation {
            ${user_1.User.mutations}
            ${todo_1.Todo.mutations}
        }
    `;
    const resolvers = {
        Query: Object.assign(Object.assign({}, user_1.User.resolvers.queries), todo_1.Todo.resolvers.queries),
        Mutation: Object.assign(Object.assign({}, user_1.User.resolvers.mutations), todo_1.Todo.resolvers.mutations),
    };
    const server = new server_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    yield server.start();
    return server;
});
exports.default = GraphQLServer;
