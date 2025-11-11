import cache_db from '../../../src/db/redis/redis';
import { saveRefreshToken, getRefreshToken, delRefreshToken, consumeRefreshToken } from '../../../src/repositories/refresh-token';

describe('test refresh-token integration with redis', () => {

    const mockTokenInformations = {
        refreshTokenUUID: '019a73fe-15a4-730c-8242-bdb28b50a69e',
        userUUID: '019a7400-43f4-7261-8d87-725153586ef0',
    };

    beforeAll(async () => {
        await cache_db.del('refresh_token019a73fe-15a4-730c-8242-bdb28b50a69e')
    });

    afterAll(async () => {
        await cache_db.quit();
    });

    it('should save token information in cacheDB', async () => {
        // Create a refresh token in Redis
        await saveRefreshToken(mockTokenInformations.refreshTokenUUID, mockTokenInformations.userUUID);

        const tokenExistis = await cache_db.hExists(`refresh_token:${mockTokenInformations.refreshTokenUUID}`, 'user_uuid');
        expect(tokenExistis).toBe(1); // Check if token was saved in BD
    });

    it('Should return the token with informations saved and mantain the token saved', async () => {
        const token = await getRefreshToken(mockTokenInformations.refreshTokenUUID);
        
        expect(token).toEqual({ user_uuid: mockTokenInformations.userUUID });

        const tokenExistis = await cache_db.hExists(`refresh_token:${mockTokenInformations.refreshTokenUUID}`, 'user_uuid');
        expect(tokenExistis).toBe(1); // Check if token still saved in BD
    });

    it('Should delete the token from cacheDB', async () => {
        const delResponse = await delRefreshToken(mockTokenInformations.refreshTokenUUID);
        expect(delResponse).toBe(1); // Check if one key was deleted

        const tokenExistis = await cache_db.hExists(`refresh_token:${mockTokenInformations.refreshTokenUUID}`, 'user_uuid');
        expect(tokenExistis).toBe(0); // Check if token was deleted from BD
    });

    it('should save token information again in cacheDB for next tests', async () => {
        // Create a refresh token in Redis
        await saveRefreshToken(mockTokenInformations.refreshTokenUUID, mockTokenInformations.userUUID);

        const tokenExistis = await cache_db.hExists(`refresh_token:${mockTokenInformations.refreshTokenUUID}`, 'user_uuid');
        expect(tokenExistis).toBe(1); // Check if token was saved in BD
    });

    it('Should return the token with informations saved and delete the token in cacheDB', async () => {
        const tokenData = await consumeRefreshToken(mockTokenInformations.refreshTokenUUID);
        console.log(tokenData);
        expect(tokenData).toBe(mockTokenInformations.userUUID);

        const tokenExistis = await cache_db.hExists(`refresh_token:${mockTokenInformations.refreshTokenUUID}`, 'user_uuid');
        expect(tokenExistis).toBe(0); // Check if token was deleted from BD
    });

});