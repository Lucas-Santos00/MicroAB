import type { FastifyInstance } from "fastify";

// pre-validation import
import { loginCredentialsCheck } from "../middlewares/auth";

// Schemas import
import jsonSchema from "../schemas/auth/login-schema";

// Controllers import
import userLoginController from "../crontrollers/auth/login-controller";

const authRoutes = async (app: FastifyInstance): Promise<void> => {

    // Login route - Return refresh token + access token
    app.post('/login', {
        schema: jsonSchema,
        preValidation: [loginCredentialsCheck],
        handler: userLoginController
    });

    // User registration route - Create new user
    app.post('/register', async (request, reply) => {
        return { message: 'Register route' };
    });

}

export default authRoutes;