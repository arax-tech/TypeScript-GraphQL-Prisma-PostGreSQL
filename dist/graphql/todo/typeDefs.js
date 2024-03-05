"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
    type Todo  {
        id : ID!
        title: String
        completed: Boolean
        user: User
        createdAt : String!  
    }
`;
