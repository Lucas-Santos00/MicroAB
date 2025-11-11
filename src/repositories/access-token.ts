import cache_db from "../db/redis/redis";

const saveAccessToken = async (tokenUUID: string, userUUID: string, ) => {

    `
        Save a access token in Redis with the following structure:
        Key: access_token:{tokenUUID}
        Value: Hash with field 'user_uuid' set to userUUID
    `

    return await cache_db.hSet('Access_token:' + tokenUUID, {
        user_uuid: userUUID
    });

}

const getAccessToken = async (token_UUID: string) => {


    `
        Get the user_uuid associated with the given Access token UUID.
    `

    return await cache_db.hGet('Access_token:' + token_UUID, 'user_uuid');

}

const delAccessToken = async (token_UUID: string) => {

    `
        Delete a Access token from Redis by its UUID.
    `

    return await cache_db.del('Access_token:' + token_UUID);

}

const consumeAccessToken = async (token_UUID: string) => {

    `
        Return and delete the user_uuid associated with the given Access token UUID.
    `

    return await cache_db.hGetDel('Access_token:' + token_UUID, 'user_uuid');

}

export {saveAccessToken, delAccessToken, consumeAccessToken, getAccessToken};