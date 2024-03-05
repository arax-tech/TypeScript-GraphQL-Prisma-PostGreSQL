"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
    type Query{
        hello :String
        say(name:String):String
    }

    type Mutation {
        createUser(
            name:String!,
            email:String!,
            password:String!,
        ) : Boolean
    }
`;
