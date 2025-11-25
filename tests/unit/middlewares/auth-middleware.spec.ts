import { FastifyRequest } from "fastify";
import { loginCredentialsCheck, registerCredentialsCheck } from "../../../src/middlewares/auth";
import { mock } from "node:test";

describe("Auth Middleware - Check login credentials", () => {

    const mockReply = () => {
            const reply: any = {};

            reply.status = jest.fn().mockImplementation(() => reply);
            reply.send = jest.fn().mockImplementation(() => reply);

            return reply;
        };

    beforeAll(() => {
        jest.clearAllMocks()
    });

    it('should not accept request without password', async () => {

        const request: any = {
            body: {
                email: 'teste@mail.com',
                password: undefined
            }
        };

        const reply = mockReply();

        await loginCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should not accept request without email', async () => {
        const request: any = {
            body: {
                email: undefined,
                password: 'validPad123!'
            }
        };

        const reply = mockReply();

        await loginCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith({ error: 'Invalid credentials' });

    });

    it('should accept request with email and password', async () => {

        const request: any = {
            body: {
                email: 'teste@mail.com',
                password: 'validPad123!'
            }
        };

        const reply = mockReply();
        
        await loginCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).not.toHaveBeenNthCalledWith(400);
    });
    
});

describe("Auth Middleware - Check register credentials", () => {

    const mockReply = () => {
            const reply: any = {};

            reply.status = jest.fn().mockImplementation(() => reply);
            reply.send = jest.fn().mockImplementation(() => reply);

            return reply;
        };

    beforeAll(() => {
        jest.clearAllMocks()
    });

    it('should not accept request without email', async () => {
        const request: any = {
            body: {
                email: undefined,
                password: 'validPad123!',
                username: 'validUsername'
            }
        };

        const reply = mockReply();
        
        await registerCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith({"error": "Invalid credentials"})
    });

    it('should not accept request without password', async () => {
        const request: any = {
            body: {
                email: 'teste@mail.com',
                password: undefined,
                username: 'validUsername'
            }
        };

        const reply = mockReply();
        
        await registerCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith({"error": "Invalid credentials"})
    });

    it('should not accept request without username', async () => {
        const request: any = {
            body: {
                email: 'teste@mail.com',
                password: 'validPad123!',
                username: undefined
            }
        };

        const reply = mockReply();
        
        await registerCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith({"error": "Invalid credentials"})
    });

    it('should not accept request with invalid email', async () => {
        const request: any = {
            body: {
                email: 'teste@com',
                password: 'validPad123!',
                username: 'validUsername'
            }
        };

        const reply = mockReply();
        
        await registerCredentialsCheck(request as FastifyRequest, reply);
        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith({"error": "Invalid credentials"})
    });

    it('should not accept request with invalid password', async () => {
        
        const request: any = {
            body: {
                email: 'teste@mail.com',
                password: '!asdw',
                username: 'validUsername'
            }
        };

        const reply = mockReply();
        
        await registerCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith({"error": "Invalid credentials"})
        
    });

    it('should not accept request with invalid username', async () => {
        const request: any = {
            body: {
                email: 'teste@mail.com',
                password: 'validPad123!',
                username: 'as'
            }
        };

        const reply = mockReply();
        
        await registerCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).toHaveBeenCalledWith(400);
        expect(reply.send).toHaveBeenCalledWith({"error": "Invalid credentials"})
    });

    it('should accept request with valid email, password and username', async () => {
        const request: any = {
            body: {
                email: 'teste@mail.com',
                password: 'validPad123!',
                username: 'validUsername'
            }
        };

        const reply = mockReply();
        
        await registerCredentialsCheck(request as FastifyRequest, reply);

        expect(reply.status).not.toHaveBeenNthCalledWith(400);
    });

});