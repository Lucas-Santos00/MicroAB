import fastifyCookie, { type FastifyCookieOptions } from "@fastify/cookie";
import type { FastifyInstance } from 'fastify';

const cookiePlugin = async (app: FastifyInstance): Promise<void> => {

    await app.register(fastifyCookie, {
        secret: process.env.APPLICATION_SECRET || 'default'
    } as FastifyCookieOptions)

}

export default cookiePlugin;