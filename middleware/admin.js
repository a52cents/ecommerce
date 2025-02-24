import { userRepository } from "../repositories/user.js";
import jwt from "jsonwebtoken";

export function registerAdminMiddlewares(fastify){
    fastify.decorate("authAdmin", async function(request, reply){
        const authHeader = request.headers["authorization"];
        if(!authHeader){
            reply.code(401).send({message:"No token Provided"});
            return;
        }
        const token = authHeader.split(" ")[1];
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userRepository.getUser(payload.id);
            if(!user || user.role !== "admin"){
                reply.code(401).send({message:"Only admin can access this route, You are: "+ user.role});
                return;
            }
            request.user = user;
        }catch(err){
            reply.code(401).send({message:"Unauthorized"});
        }
    });
}