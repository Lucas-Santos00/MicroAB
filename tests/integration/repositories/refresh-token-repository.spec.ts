import cache_db from '../../../src/db/redis/redis';
import { saveRefreshToken, getRefreshToken, delRefreshToken, consumeRefreshToken } from '../../../src/repositories/refresh-token-repository';

describe('test refresh-token integration with redis', () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDE5YTc0MDAtNDNmNC03MjYxLThkODctNzI1MTUzNTg2ZWYwIiwicmVmcmVzaF91dWlkIjoiMDE5YTczZmUtMTVhNC03MzBjLTgyNDItYmRiMjhiNTBhNjllIn0.XIu_aS_3U5plfwIrDeaN2LdEVeLjcf_WN_-xY7LGlPw';
    let refreshTokenUUID = '019a73fe-15a4-730c-8242-bdb28b50a69e';

    beforeAll(async () => {
        await cache_db.del('refresh_token:019a73fe-15a4-730c-8242-bdb28b50a69e')
    });

    afterAll(async () => {
        await cache_db.quit();
    });

    it('should save token information in cacheDB', async () => {

        // Create a refresh token in Redis
        await saveRefreshToken(refreshTokenUUID, token);

        const tokenExistis = await cache_db.exists(`refresh_token:${refreshTokenUUID}`);
        expect(tokenExistis).toBe(1); // Check if token was saved in BD

    });
    
    it('Should return the token with informations saved and mantain the token saved', async () => {
        const token = await getRefreshToken(refreshTokenUUID);
        
        expect(token).toEqual(token);

        const tokenExistis = await cache_db.exists(`refresh_token:${refreshTokenUUID}`);
        expect(tokenExistis).toBe(1); // Check if token still saved in BD
    });

    it('Should delete the token from cacheDB', async () => {
        const delResponse = await delRefreshToken(refreshTokenUUID);
        expect(delResponse).toBe(1); // Check if one key was deleted

        const tokenExistis = await cache_db.exists(`refresh_token:${refreshTokenUUID}`);
        expect(tokenExistis).toBe(0); // Check if token was deleted from BD
    });

    it('should save token information again in cacheDB for next tests', async () => {
        // Create a refresh token in Redis
        await saveRefreshToken(refreshTokenUUID, token);

        const tokenExistis = await cache_db.exists(`refresh_token:${refreshTokenUUID}`);
        expect(tokenExistis).toBe(1); // Check if token was saved in BD
    });

    it('Should return the token with informations saved and delete the token in cacheDB', async () => {
        const tokenData = await consumeRefreshToken(refreshTokenUUID);
        expect(tokenData).toBe(token);

        const tokenExistis = await cache_db.exists(`refresh_token:${refreshTokenUUID}`);
        expect(tokenExistis).toBe(0); // Check if token was deleted from BD
    });

});