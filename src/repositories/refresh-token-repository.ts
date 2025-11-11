import cache_db from "../db/redis/redis";

const saveRefreshToken = async (token_UUID: string, user_UUID: string) => {

    `
        Save a refresh token in Redis with the following structure:
        Key: refresh_token:{tokenUUID}
        Value: Hash with field 'user_uuid' set to userUUID
        TTL: 7 days
    `

    const result = await cache_db.hSet(`refresh_token:${token_UUID}`, {
        user_uuid: user_UUID
    });

    await cache_db.expire(`refresh_token:${token_UUID}`, 60 * 60 * 24 * 7); // Set expiration to 7 days

    return result

}

const getRefreshToken = async (token_UUID: string) => {

    `
        Retrieve all information associated with a refresh token from Redis by its UUID.
    `

    return await cache_db.hGetAll(`refresh_token:${token_UUID}`);

}

const delRefreshToken = async (token_UUID: string) => {

    `
        Delete a refresh token from Redis by its UUID.
    `

    return await cache_db.del(`refresh_token:${token_UUID}`);

}

const consumeRefreshToken = async (token_UUID: string) => {

    `
        Return and delete the user_uuid associated with the given refresh token UUID, token is elso deleted from Redis.
        Observation: hGetDel is not supported in node-redis, so we do it in two steps.
    `

    const user_UUID = await cache_db.hGet(`refresh_token:${token_UUID}`, 'user_uuid');
    await cache_db.del(`refresh_token:${token_UUID}`);    

    return user_UUID

}

export {saveRefreshToken, delRefreshToken, consumeRefreshToken, getRefreshToken};