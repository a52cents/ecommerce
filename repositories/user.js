import { prisma } from "../services/db.js";

export const userRepository = {
    createUser: async (user) => {
        const newUser = prisma.utilisateur.create({
            data: user
        });
        return newUser;
    },
    getUser: async (id) => {
        const user = prisma.utilisateur.findUnique({
            where: { id: id }
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    },
    getUserByMailPwd: async (mail, password) => {
        console.log(mail + " " + password)
        const user = prisma.utilisateur.findFirst({
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