import type { FastifyReply, FastifyRequest } from "fastify";
import validateEmail from "../utils/check-user-email";
import validatePassword from "../utils/check-user-password";
import validateUserName from "../utils/check-user-name";
import type { LoginCredentials } from "../types/login-credentials";
import type { RegisterCredentials } from "../types/register-credentials";

const loginCredentialsCheck = async (request: FastifyRequest, reply: FastifyReply) => {
    const [email, password] = [(request.body as LoginCredentials).email, (request.body as LoginCredentials).password];

    if (!validateEmail(email).valid) {
        reply.status(400).send({ error: 'Invalid credentials' });
        return;
    }

    if (!(await validatePassword(password)).valid) {
        reply.status(400).send({ error: 'Invalid credentials' });
        return;
    }

}

const registerCredentialsCheck = async (request: FastifyRequest, reply: FastifyReply) => {
    const [email, password, username] = [
        (request.body as RegisterCredentials).email,
        (request.body as RegisterCredentials).password,
        (request.body as RegisterCredentials).username
    ];

    if (!validateEmail(email).valid) {
        reply.status(400).send({ error: 'Invalid credentials' });
        return;
    }

    if (!(await validatePassword(password)).valid) {
        reply.status(400).send({ error: 'Invalid credentials' });
        return;
    }

    if (!(validateUserName(username)).valid) {
        reply.status(400).send({ error: 'Invalid credentials' });
        return;
    }
}

export { loginCredentialsCheck, registerCredentialsCheck };