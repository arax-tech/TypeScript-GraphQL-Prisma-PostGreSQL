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
const client_1 = __importDefault(require("../client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
class UserService {
    static register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = payload;
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            return client_1.default.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
        });
    }
    static getUserByEmail(email) {
        return client_1.default.user.findUnique({ where: { email } });
    }
    static getUserById(id) {
        return client_1.default.user.findUnique({ where: { id } });
    }
    static login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.getUserByEmail(email);
            if (!user)
                throw new Error("Invalid Email OR Password...");
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error("Invalid Email OR Password...");
            // Generate JSONWebToken
            const token = yield jsonwebtoken_1.default.sign({ id: user.id }, "546tdte6ev5gb688i9mdtrywed243s54asr5");
            return token;
        });
    }
    static getUserWithToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.verify(token, "546tdte6ev5gb688i9mdtrywed243s54asr5");
        });
    }
}
exports.default = UserService;
