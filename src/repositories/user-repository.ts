import { db } from "../db/drizzle/drizzle"
import { eq } from "drizzle-orm"
import { users } from "../db/drizzle/dbschema"

// If not necessary, you can remove this type definition
type UserCredentials = {
    uuid: string
    name: string;
    email: string;
    passwordHash: string;
}

const saveUserCredentials = async (uuid: string, email: string, passwordHash: string, username: string) => {
    return await db.insert(users).values({
        uuid: uuid,
        username: username,
        email: email,
        password_hash: passwordHash,
    });
}

const getUserByUUID = async (uuid: string) => {
    return await db.select().from(users).where(eq(users.uuid, uuid)).limit(1);
}

const getUserByEmail = async (email: string) => {
    return await db.select().from(users).where(eq(users.email, email)).limit(1);
}

const changeUserName = async (uuid: string, newName: string) => {
    return await db.update(users).set({ username: newName }).where(eq(users.uuid, uuid));
}

const changeUserEmail = async (uuid: string, newEmail: string) => {
    return await db.update(users).set({ email: newEmail }).where(eq(users.uuid, uuid));
}

const changePasswordHash = async (uuid: string, newPasswordHash: string) => {
    return await db.update(users).set({ password_hash: newPasswordHash }).where(eq(users.uuid, uuid));
}

const desativateUser = async (uuid: string) => {
    return await db.update(users).set({ desactivated: true }).where(eq(users.uuid, uuid));
} 

export {saveUserCredentials, getUserByUUID, getUserByEmail, changeUserName, changeUserEmail, changePasswordHash, desativateUser};