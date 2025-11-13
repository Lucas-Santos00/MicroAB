import type { FastifyInstance } from "fastify";
import authRoutes from "./auth-routes";

const routes = async (app: FastifyInstance): Promise<void> => {

    console.log('Arquivo index de rotas carregado.');

    await app.register(authRoutes, { prefix: '/auth' });

}

export default routes;