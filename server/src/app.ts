import fastify from 'fastify';
import {prismaClient} from './utils/prisma';
import {jwtConf} from './conf/jwt.conf';
import {routesConf} from './conf/routes.conf';

async function bootstrap() {
  try {
    const server = fastify({
      logger: true,
    });
    await routesConf(server)
    await jwtConf(server)
    await prismaClient.$connect().then(() => {
      console.log('Prisma Connected');
    });
    server.listen({port: 5000}, (err, address) => {
      if (err) throw err;
      console.log(`server listening on ${address}`);
    });

  } catch (err) {
    process.exit(1)
  }
}

bootstrap();
