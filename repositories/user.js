import { prisma } from "../services/db.js";

export const userRepository = {
    createUser: async (user) => {
        const newUser = await prisma.utilisateur.create({
            data: user
        });
        return newUser;
    },
    getUser: async (id) => {
        const user = await prisma.utilisateur.findUnique({
            where: { id: id }
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },
    getUserByMailPwd: async (mail, password) => {
        const user = await prisma.utilisateur.findFirst({
            where: {
                mail: mail,
                password: password
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}