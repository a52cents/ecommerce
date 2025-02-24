import { userRepository } from "../repositories/user.js";
import { CreateUserDto,GetUserByMailPwdDto,GetUserDto } from "../dtos/UserDtos.js";
import JWT from "jsonwebtoken";
import { createHash } from "crypto";
export function registerAuthRoutes(fastify){
    fastify.post("/signup",{schema: CreateUserDto}, async (request, reply) => {
        const user = request.body;
        user.password = createHash("sha1")
            .update(user.password+process.env.SALT)
            .digest("hex");
        const newUser = await userRepository.createUser(user);
        return newUser;
    });
    fastify.post("/login",{schema: GetUserByMailPwdDto}, async (request, reply) => {
        const user = request.body;
        user.password = createHash("sha1")
            .update(user.password+process.env.SALT)
            .digest("hex");
        const userfound = await userRepository.getUserByMailPwd(user.mail, user.password);
        if(!userfound){
            throw new Error("User not found");
        }
        userfound.token = JWT.sign({id:userfound.id},process.env.JWT_SECRET);
        return userfound;
    });
}