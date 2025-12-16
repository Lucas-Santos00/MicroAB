import { getProjectKeyByUuid } from '../../../src/repositories/project-repository';
import { pool } from '../../../src/db/drizzle/drizzle';

describe('Validate Project Repository', () => {

    afterAll(async () => {
        await pool.end();
    });

    const projectMockUuid = '019b2361-eabb-7197-81ed-e796dab6d5c5';

    it('should return project key by project uuid', async () => {
        
        expect(await getProjectKeyByUuid(projectMockUuid)).toBeDefined();
    });

});