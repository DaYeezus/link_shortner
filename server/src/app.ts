import fastify, {FastifyInstance} from "fastify";
import {prismaClient} from "./utils/prisma";
import {jwtConf} from "./conf/jwt.conf";
import {routesConf} from "./conf/routes.conf";

export async function getServer(): Promise<FastifyInstance> {
    const server = fastify({
        logger: true,
    });
    await routesConf(server);
    await jwtConf(server);
    return server;
}

async function bootstrap() {
    try {
        const server = await getServer();
        await prismaClient.$connect().then(() => {
            console.log("Prisma Connected");
        });
        server.listen({port: 5000}, (err, address) => {
            if (err) throw err;
            console.log(`server listening on ${address}`);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

bootstrap();
