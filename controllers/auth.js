import { userRepository } from "../repositories/user.js";
import { CreateUserDto, GetUserByMailPwdDto, GetUserDto } from "../dtos/UserDtos.js";
import JWT from "jsonwebtoken";
import { createHash } from "crypto";
/**
 * Registers authentication routes for user signup and login.
 *
 * @param {import('fastify').FastifyInstance} fastify - The Fastify instance to register routes on.
 *
 * @description
 * This function sets up two authentication endpoints:
 * - POST /signup: Registers a new user. The password is hashed using SHA1 and a salt from environment variables.
 *   After user creation, a JWT token is generated and returned along with user details.
 * - POST /login: Authenticates an existing user by verifying the email and hashed password.
 *   If authentication is successful, a JWT token and user details are returned.
 */
export function registerAuthRoutes(fastify) {
    fastify.post("/signup", { schema: CreateUserDto }, async (request, reply) => {
        const user = request.body;
        user.password = createHash("sha1")
            .update(user.password + process.env.SALT)
            .digest("hex");
        const newUser = await userRepository.createUser(user);
        const token = JWT.sign({ id: newUser.id }, process.env.JWT_SECRET);
        return { id: newUser.id, mail: newUser.mail, role: newUser.role, token };
    });
    fastify.post("/login", { schema: GetUserByMailPwdDto }, async (request, reply) => {
        const user = request.body;
        user.password = createHash("sha1")
            .update(user.password + process.env.SALT)
            .digest("hex");
        const userfound = await userRepository.getUserByMailPwd(user.mail, user.password);
        if (!userfound) {
            throw new Error("User not found");
        }
        const token = JWT.sign({ id: userfound.id }, process.env.JWT_SECRET);
        return { id: userfound.id, mail: userfound.mail, role: userfound.role, token };
    });
}