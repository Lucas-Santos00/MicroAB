import cache_db from "../db/redis/redis";

const saveRefreshToken = async (token_UUID: string, user_UUID: string) => {

    `
        Save a refresh token in Redis with the following structure:
        Key: refresh_token:{tokenUUID}
        Value: Hash with field 'user_uuid' set to userUUID
    `

    return await cache_db.hSet('refresh_token:' + token_UUID, {
        user_uuid: user_UUID
    });

}

const getRefreshToken = async (token_UUID: string) => {

    return await cache_db.hGet('Access_token:' + token_UUID, 'user_uuid');

}

const delRefreshToken = async (token_UUID: string) => {

    `
        Delete a refresh token from Redis by its UUID.
    `

    return await cache_db.del('refresh_token:' + token_UUID);

}

const consumeRefreshToken = async (token_UUID: string) => {

    `
        Return and delete the user_uuid associated with the given refresh token UUID.
    `

    return await cache_db.hGetDel('refresh_token:' + token_UUID, 'user_uuid');

}

export {saveRefreshToken, delRefreshToken, consumeRefreshToken, getRefreshToken};