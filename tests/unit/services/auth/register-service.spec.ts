jest.mock("../../../../src/repositories/user-repository", () => ({
    saveUserCredentials: jest.fn().mockResolvedValue("OK")
}));

jest.mock("../../../../src/repositories/access-token-repository", () => ({
    saveAccessToken: jest.fn().mockResolvedValue("OK")
}));

jest.mock("../../../../src/repositories/refresh-token-repository", () => ({
    saveRefreshToken: jest.fn().mockResolvedValue("OK")
}));

jest.mock("../../../../src/db/redis/redis", () => ({
    cache_db: {
        connect: jest.fn().mockResolvedValue("connected"),
    }
}));

import registerService from "../../../../src/services/auth/register-service";
import { saveAccessToken } from "../../../../src/repositories/access-token-repository";
import { saveRefreshToken } from "../../../../src/repositories/refresh-token-repository";
import { saveUserCredentials } from "../../../../src/repositories/user-repository";

const mockedCredentials = {
    email: "teste@mail.com",
    password: "SgPasrd123!",
    username: "testeUser"
}

describe("Unit test for register service", () => {

    it('should return status 201 and tokens with valid user credentials', async () => {
        
        const result = await registerService(mockedCredentials.email, mockedCredentials.password, mockedCredentials.username);

        expect(result.code).toBe(201);
        expect(result.accessToken).not.toBe('');
        expect(result.refreshToken).not.toBe('');
        expect(result.error).toBeUndefined();
        expect(result.message).toBe('User registered successfully');
    });

    it('should return status 500 and error true when saving access token fails', async () => {

        (saveAccessToken as jest.Mock).mockResolvedValueOnce("FAIL");

        const result = await registerService(mockedCredentials.email, mockedCredentials.password, mockedCredentials.username);

        expect(result.code).toBe(500);
        expect(result.error).toBe(true);
        expect(result.accessToken).toBe('');
        expect(result.refreshToken).toBe('');
        expect(result.message).toBe('Internal server error');

    });


    it('should return status 500 and error true when saving access token fails', async () => {

        ( saveRefreshToken as jest.Mock).mockResolvedValueOnce("FAIL");

        const result = await registerService(mockedCredentials.email, mockedCredentials.password, mockedCredentials.username);

        expect(result.code).toBe(500);
        expect(result.error).toBe(true);
        expect(result.accessToken).toBe('');
        expect(result.refreshToken).toBe('');
        expect(result.message).toBe('Internal server error');

    });

    it('should hash the password before saving', async () => {

        await registerService(mockedCredentials.email, mockedCredentials.password, mockedCredentials.username);
        
        expect(saveUserCredentials).toHaveBeenCalledWith(
            expect.any(String),
            mockedCredentials.email,
            expect.not.stringContaining(mockedCredentials.password),
            mockedCredentials.username
        );
    
    });

})