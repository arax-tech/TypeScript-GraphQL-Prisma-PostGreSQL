import prisma from "../client";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}
export interface LoginPayload {
    email: string;
    password: string;
}

class UserService {
    public static async register(payload: RegisterPayload) {
        const { name, email, password } = payload;
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    }
    
    private static getUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }
    public static getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    public static async login(payload: LoginPayload) {
        const { email, password } = payload;

        const user = await UserService.getUserByEmail(email);
        if(!user) throw new Error("Invalid Email OR Password...")
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) throw new Error("Invalid Email OR Password...")

        // Generate JSONWebToken
        const token = await JWT.sign({ id: user.id }, "546tdte6ev5gb688i9mdtrywed243s54asr5");
        return token;
    }

    public static async getUserWithToken (token : string){
        return await JWT.verify(token, "546tdte6ev5gb688i9mdtrywed243s54asr5");
    }
}

export default UserService;
