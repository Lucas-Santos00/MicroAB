import type { FastifyReply, FastifyRequest } from "fastify";
import loginService from "../../services/auth/login-service";
import type { LoginCredentials } from "../../types/login-credentials";

const userLoginController = async (request: FastifyRequest, reply:FastifyReply)  => {

    const [email, password] = [
        (request.body as LoginCredentials).email, 
        (request.body as LoginCredentials).password
    ];

    const result = await loginService(email, password);

    reply.status(result.code).send(result);

}

export default userLoginController;