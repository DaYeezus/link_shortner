import {User} from "@prisma/client";
import {comparePassword, hashPassword} from "../utils/security";
import {prismaClient} from "../utils/prisma";

export class UserService {
    static async resetPassword(password:string , user:User){
        const existUser = await prismaClient.user.findFirstOrThrow({where:{id:user.id}})
        if (await comparePassword(password, existUser.password)) {
            throw new Error("Cannot use old password");
        }
        const hashedPassword = await hashPassword(password);
        await prismaClient.user
            .update({
                where: {
                    id: user.id,
                },
                data: {
                    password: hashedPassword,
                },
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
    static async getUserLinks(user:User){
        return prismaClient.link.findMany({
            where: {
                userId: user.id
            }
        });
    }
}
