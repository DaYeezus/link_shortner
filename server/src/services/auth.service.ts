import  {
    forgotPasswordBodyType,
    loginSchemaType,
    registerSchemaType,
    resetPasswordBodyType
} from "../schemas/auth.schema";
import {prismaClient} from "../utils/prisma";
import {comparePassword, hashPassword} from "../utils/security";
import {JWT} from "@fastify/jwt";
import {sendEmail} from "../utils/mailer";

export default class AuthService {
    static async register(data: registerSchemaType) {
        const {email, password} = data
        const existEmail = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if (existEmail) {
            throw new Error('Email already exist')
        }
        const hashedPassword = await hashPassword(password)
        await prismaClient.user.create({
            data: {
                email,
                password: hashedPassword,
                Plan:"Free"

            }
        }).catch(err => {
            throw new Error(err)
        })
    }

    static async login(data: loginSchemaType): Promise<number> {
        const {password, email} = data
        const existUser = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (!existUser) {
            throw new Error("User not exist")
        }
        const isExactPass = await comparePassword(password, existUser.password)
        console.log(isExactPass)
        if (!isExactPass) {

            throw new Error("User not exist")
        }
        return existUser.id
    }

    static async forgotPassword(data: forgotPasswordBodyType, jwt: JWT): Promise<void> {
        const {email} = data
        if (!await prismaClient.user.findFirst({
            where: {
                email
            }
        })) {
            throw new Error("User not exist")
        }
        const resetPasswordToken = jwt.sign({email})
        const link = process.env.BASE_URL + "/" + resetPasswordToken
        const message = `Hello dear ${email} use this link to reset your password \n ${link}`
        sendEmail({to: email, message})
    }

    static async resetPassword(data: resetPasswordBodyType, token: string, jwt: JWT): Promise<void> {
        const {password} = data
        const email = jwt.decode(token)
        if (!email) {
            throw new Error("Invalid token")
        }
        const existUser = await prismaClient.user.findFirst({
            where: {
                email
            }
        })
        if (!existUser) {
            throw new Error("User not exist")
        }
        if (await comparePassword(password, existUser.password)) {
            throw new Error("Cannot use old password")
        }
        const hashedPassword = await hashPassword(password)
        await prismaClient.user.update({
            where: {
                id: existUser.id
            },
            data: {
                password: hashedPassword
            }
        }).catch(err => {
            throw new Error(err)
        })
    }
}
