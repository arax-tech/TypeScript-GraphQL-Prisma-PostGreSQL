import prisma from "../client";

export interface TodoPayload {
    userId: string;
    title: string;
}

class ToDoService {
    public static async create(payload: TodoPayload) {
        const { userId, title } = payload;
        return await prisma.todo.create({
            data: {
                title,
                completed: false,
                userId,
            },
        });
    }
}

export default ToDoService;
