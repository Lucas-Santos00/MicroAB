import type { FastifyInstance } from "fastify";
import authRoutes from "./auth-routes";

const routes = async (app: FastifyInstance): Promise<void> => {

    await app.register(authRoutes, { prefix: '/auth' });

}

export default routes;