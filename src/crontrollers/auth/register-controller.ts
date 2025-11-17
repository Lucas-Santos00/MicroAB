import type { FastifyReply, FastifyRequest } from "fastify";
import type { RegisterCredentials } from "../../types/register-credentials";
import registerService from "../../services/auth/register-service";


const userLoginController = async (request: FastifyRequest, reply:FastifyReply)  => {

    const [email, password, username] = [
        (request.body as RegisterCredentials).email, 
        (request.body as RegisterCredentials).password,
        (request.body as RegisterCredentials).username
    ];

    console.log(email, password, username);

    const result = await registerService(email, password, username);

    if(result.hasOwnProperty('error')){
        reply.status(result.code).send(result.message);
    }

    reply.status(201)
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
}

export default userLoginController;