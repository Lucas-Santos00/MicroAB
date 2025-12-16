import { db } from '../db/drizzle/drizzle';
import { projects } from '../db/drizzle/dbschema';
import { eq } from 'drizzle-orm';

export const getProjectKeyByUuid = async (projectUuid: string) => {

    const result = await db.select({project_key: projects.project_secret_key}).from(projects).where(eq(projects.project_uuid, projectUuid)).limit(1);

    return result[0]?.project_key;

}