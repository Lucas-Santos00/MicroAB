import {db, pool} from '../../../src/db/drizzle/drizzle'
import {users} from '../../../src/db/drizzle/dbschema'
import {eq} from 'drizzle-orm'
import {saveUserCredentials, getUserByUUID, changeUserName, changeUserEmail, changePasswordHash, desativateUser} from '../../../src/repositories/user-repository'

describe('Test user repository with DataBase', () => {

    const mockUser = {
        uuid: '019a782b-839a-76c2-8d83-5f49860f8248',
        name: 'Test User Two',
        email: 'test2@mails.com',
        passwordHash: '527a695e46487d572f6eb2cd50ce2b0c'
    };

    beforeAll(async () => {
        await db.delete(users).where(eq(users.email, mockUser.email)).execute();
        await db.delete(users).where(eq(users.uuid, mockUser.uuid)).execute();
    });

    afterAll(async () => {
        await pool.end();
    });

    it('should insert a user', async () => {

        await saveUserCredentials(mockUser.uuid, mockUser.email, mockUser.passwordHash, mockUser.name);

        const [user] = await db.select().from(users).where(eq(users.uuid, mockUser.uuid)).limit(1)

        expect(user).toBeDefined();
        expect(user.username).toBe(mockUser.name);
        expect(user.email).toBe(mockUser.email);
        expect(user.password_hash).toBe(mockUser.passwordHash);

    });

    it('should return the correctly user by UUID', async () => {

        const [user] = await getUserByUUID(mockUser.uuid);

        expect(user).toBeDefined();
        expect(user.username).toBe(mockUser.name);
        expect(user.email).toBe(mockUser.email);
        expect(user.password_hash).toBe(mockUser.passwordHash);

    });

    it('should return null for non-existing UUID', async () => {
        const [user] = await getUserByUUID('019a7845-c18b-71a2-85da-cc9dd9a41b80');

        expect(user).toBeUndefined();
    });

    it('should return a user by email', async () => {
        const [user] = await db.select().from(users).where(eq(users.email, mockUser.email)).limit(1);

        expect(user).toBeDefined();
        expect(user.username).toBe(mockUser.name);
        expect(user.email).toBe(mockUser.email);
        expect(user.password_hash).toBe(mockUser.passwordHash);
    });

    it('should return null for non-existing email', async () => {
        const [user] = await db.select().from(users).where(eq(users.email, 'testeNull@mail.com')).limit(1);

        expect(user).toBeUndefined();
    });

    it('should update a user name', async () => {
        const newName = 'Updated Test User Two';

        await changeUserName(mockUser.uuid, newName);

        const [updatedUser] = await db.select().from(users).where(eq(users.uuid, mockUser.uuid)).limit(1);

        expect(updatedUser).toBeDefined();
        expect(updatedUser.username).toBe(newName);
    });

    it('should update a user email', async () => {
        const newEmail= 'newTestMail@mail.com'

        await changeUserEmail(mockUser.uuid, newEmail);

        const [updatedUser] = await db.select().from(users).where(eq(users.uuid, mockUser.uuid)).limit(1);

        expect(updatedUser).toBeDefined();
        expect(updatedUser.email).toBe(newEmail);
    });

    it('should update a user password hash', async () => {
        const newPasswordHash = '827a695e46487d572f6eb2cd50ce2b0c'

        await changePasswordHash(mockUser.uuid, newPasswordHash);

        const [updatedUser] = await db.select().from(users).where(eq(users.uuid, mockUser.uuid)).limit(1);

        expect(updatedUser).toBeDefined();
        expect(updatedUser.password_hash).toBe(newPasswordHash);

    }); 

    it('should desativate a user', async () => {
        await desativateUser(mockUser.uuid);

        const [updatedUser] = await db.select().from(users).where(eq(users.uuid, mockUser.uuid)).limit(1);

        expect(updatedUser).toBeDefined();
        expect(updatedUser.desactivated).toBe(true);
    });

});