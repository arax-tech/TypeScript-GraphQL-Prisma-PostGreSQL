import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import GraphQLServer from "./graphql";
import UserService from "./services/user";

const start = async () => {
    const app = express();
    const PORT = process.env.PORT || 8000;

    // Middleware
    app.use(express.json());

    // Start GraphQL Server
    const server = await GraphQLServer();

    // Routes
    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req }) => {
                // @ts-ignore
                const token = req.headers.authorization;
                console.log(token)
                try {
                    const user = await UserService.getUserWithToken(token as string );
                    return { user };
                } catch (error) {
                    return {};
                }
            },
        })
    );
    app.get("/", (request, response) => {
        response.json({
            message: "Welcome...",
        });
    });

    // Server
    app.listen(PORT, () => {
        console.log(`Server is Running at http://localhost:${PORT}`);
    });
};

start();
