import fastify from 'fastify';
import {prismaClient} from "./utils/prisma";
async function bootstrap() {
    const server = fastify({
        logger: true,
    })

    try{
        await prismaClient.$connect().then(() => {
            console.log("Prisma Connected")
        })
        await server.listen({port:3000}, (err,address) => {
            if (err) throw err
            console.log(`server listening on ${address}`)
        })
    }catch (err){
        console.log(err)
    }

}
bootstrap()
