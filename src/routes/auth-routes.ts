import type { FastifyInstance } from "fastify";

// pre-validation import
import { loginCredentialsCheck, registerCredentialsCheck } from "../middlewares/auth";

// Schemas import
import loginJsonSchema from "../schemas/auth/login-schema";
import registerJsonSchema from "../schemas/auth/register-schema";

// Controllers import
import userLoginController from "../crontrollers/auth/login-controller";
import userRegisterController from "../crontrollers/auth/register-controller";

const authRoutes = async (app: FastifyInstance): Promise<void> => {

    // Login route - Return refresh token + access token
    app.post('/login', {
        schema: loginJsonSchema,
        preValidation: [loginCredentialsCheck],
        handler: userLoginController
    });

    // User registration route - Create new user
    app.post('/register', {
        schema: registerJsonSchema,
        preValidation: [registerCredentialsCheck],
        handler: userRegisterController
    });

}

export default authRoutes;