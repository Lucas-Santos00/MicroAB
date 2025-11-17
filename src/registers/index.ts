import type { FastifyInstance } from 'fastify';
import rateLimitPligin from './rateLimit/rateLimit-plugin';
import cookiePlugin from './cookie/cookie-plugin';
import errorHandlers from './errorHandlers/error-handlers';
import routes from "../routes/index";

const fastifyRegisters = async (app: FastifyInstance): Promise<void> => {

    await rateLimitPligin(app);

    await cookiePlugin(app);

    await routes(app);

    errorHandlers(app);

}

export default fastifyRegisters;