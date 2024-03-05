import UserService, { RegisterPayload } from "../../services/user";

const queries = {
    login: async (_: any, payload: { email: string; password: string }) => {
        const token = await UserService.login({
            email: payload.email,
            password: payload.password,
        });
        return token;
    },
    profile : async(_:any, parameters:any, context:any) => {
        if(context && context.user){
            return await UserService.getUserById(context.user.id);
        }
        throw new Error('Please Login to Access...')
    }
};

const mutations = {
    register: async (_: any, payload: RegisterPayload) => {
        const res = await UserService.register(payload);
        return "Registration Successfully...";
    },
};

export const resolvers = { queries, mutations };
