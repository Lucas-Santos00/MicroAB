jest.mock("../../../../src/repositories/access-token-repository", () => ({
    saveAccessToken: jest.fn().mockResolvedValue("OK")
}));

jest.mock("../../../../src/repositories/refresh-token-repository", () => ({
    saveRefreshToken: jest.fn().mockResolvedValue("OK")
}));

jest.mock("../../../../src/repositories/user-repository", () => ({
    getUserByEmail: jest.fn().mockResolvedValue([{
        uuid: "user-uuid-1234",
        email: "teste2@teste.com",
        password_hash: "$argon2id$v=19$m=65536,t=3,p=4$EtMPQMHRn1bP88KbUjYiOQ$whiEkhgNd2ZgNDdMr7U/NN0WSswZgZTSWZz9HWgaQtg"
    }]),
}));

jest.mock("../../../../src/db/redis/redis", () => ({
    cache_db: {
        connect: jest.fn().mockResolvedValue("connected"),
    },
}));

jest.mock("")


import loginService from "../../../../src/services/auth/login-service";

describe('test login service', () => {

    const credentials = {
        "email": "teste2@teste.com",
        "password": "Aa@12345"
    }

    it('should return status 200 and tokens with valid user credentials', async () => {

        // validar se informações estão corretas com o banco
        // Comparar hashed password com argon2.verify
        // Gerar tokens
        // Retornar tokens
        
        const result = await loginService(credentials.email, credentials.password);

        expect(result.code).toBe(200);
        expect(result.accessToken).not.toBe('');
        expect(result.refreshToken).not.toBe('');

    });

    it('should return error if email does not exists', async () => {

        // validar se email não existe no banco
        // Retornar erro 401

        const { getUserByEmail } = require("../../../../src/repositories/user-repository");
        getUserByEmail.mockResolvedValueOnce([]);

        const result = await loginService(credentials.email, credentials.password);

        expect(result.code).toBe(401);
        expect(result.error).toBe(true);
        expect(result.accessToken).toBe('');
        expect(result.refreshToken).toBe('');
        expect(result.message).toBe('Invalid credentials');

    });

    it('should return error if the password is invalid', async () => {

        // validar se senha está incorreta
            // Retornar erro 401

        const result = await loginService(credentials.email, "WrongPassword123!");

        expect(result.code).toBe(401);
        expect(result.error).toBe(true);
        expect(result.accessToken).toBe('');
        expect(result.refreshToken).toBe('');
        expect(result.message).toBe('Invalid credentials');

    });

    it('should return status 500 and error true when saving access token fails', async () => {

        // validar se falha ao salvar tokens
            // Retornar erro 500

        const { saveAccessToken } = require("../../../../src/repositories/access-token-repository");
        saveAccessToken.mockResolvedValueOnce("FAIL");

        const result = await loginService(credentials.email, credentials.password);

        expect(result.code).toBe(500);
        expect(result.error).toBe(true);
        expect(result.accessToken).toBe('');
        expect(result.refreshToken).toBe('');
        expect(result.message).toBe('Internal server error');

    });

    it('should return status 500 and error true when saving refresh token fails', async () => {

        // validar se falha ao salvar tokens
        // Retornar erro 500

        const { saveRefreshToken } = require("../../../../src/repositories/refresh-token-repository");
        saveRefreshToken.mockResolvedValueOnce("FAIL");

        const result = await loginService(credentials.email, credentials.password);

        expect(result.code).toBe(500);
        expect(result.error).toBe(true);
        expect(result.accessToken).toBe('');
        expect(result.refreshToken).toBe('');
        expect(result.message).toBe('Internal server error');

    });

});