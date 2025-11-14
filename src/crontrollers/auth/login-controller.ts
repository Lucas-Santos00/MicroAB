import loginService from "../../services/auth/login-service";
import type { LoginCredentials } from "../../types/login-credentials";
import type { FastifyReply, FastifyRequest } from "fastify";

const userLoginController = async (request: FastifyRequest, reply:FastifyReply)  => {

    const [email, password] = [
        (request.body as LoginCredentials).email, 
        (request.body as LoginCredentials).password
    ];

    const result = await loginService(email, password);

    if(result.hasOwnProperty('error')){
        reply.status(result.code).send(result.message);
    }

    reply.status(200)
    .setCookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 // 7 days
    })
    .setCookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    })
    .send('Login successful');

}

export default userLoginController;