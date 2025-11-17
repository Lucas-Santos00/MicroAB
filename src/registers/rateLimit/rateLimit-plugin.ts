import type { FastifyInstance } from 'fastify';
import rateLimit from "@fastify/rate-limit";

const rateLimitPlugin = async (app: FastifyInstance): Promise<void> => {

    await app.register(rateLimit, {
        global: false, // If true, applies to all routes
    });

}

export default rateLimitPlugin;