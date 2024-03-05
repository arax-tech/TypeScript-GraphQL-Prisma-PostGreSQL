import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Todo } from "./todo";

const GraphQLServer = async () => {
    // Create GraphQL Server
    const typeDefs = `
        ${User.typeDefs}
        ${Todo.typeDefs}
        type Query{
            ${User.queries}
            ${Todo.queries}
        }
        type Mutation {
            ${User.mutations}
            ${Todo.mutations}
        }
    `;

    const resolvers = {
        Query: {
            ...User.resolvers.queries,
            ...Todo.resolvers.queries,
        },
        Mutation: {
            ...User.resolvers.mutations,
            ...Todo.resolvers.mutations 
        },
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    return server;
};

export default GraphQLServer;
