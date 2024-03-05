import prisma from "../../client";
import ToDoService from "../../services/todo";

const queries = {};

const mutations = {
    createTodo: async (_: any, payload: { title: string }, context: any) => {
        try {
            const todo = await prisma.todo.create({
                data: {
                    title: payload.title,
                    userId: context.user.id,
                    completed: false,
                },
            });
            return todo;
        } catch (error) {
            throw new Error(`${error}`);
        }
    },
};

export const resolvers = { queries, mutations };
