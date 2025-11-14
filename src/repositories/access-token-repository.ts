import cache_db from "../db/redis/redis";

const saveAccessToken = async (token_UUID: string, token: string) => {

    `
        Save access token in cache with key as token_UUID

        Key: access_token:{token_UUID}
        Value: token (string)
        Expiration: 7 days
    `

    const result = await cache_db.set(`access_token:${token_UUID}`, token)

    await cache_db.expire(`Access_token:${token_UUID}`, 7 * 24 * 60 * 60)

    return result

}

const getAccessToken = async (token_UUID: string) => {

    `
        Get access token from cache using token_UUID

        Key: access_token:{token_UUID}
        Returns: token (string) or null if not found
    `

    return await cache_db.get(`access_token:${token_UUID}`)

}

const delAccessToken = async (token_UUID: string) => {

    `
        Delete access token from cache using token_UUID

        Key: access_token:{token_UUID}
        Returns: number of keys that were removed
    `

    return await cache_db.del(`access_token:${token_UUID}`)

}

const consumeAccessToken = async (token_UUID: string) => {

    `
        Consume (get and delete) access token from cache using token_UUID

        Key: access_token:{token_UUID}
        Returns: token (string) or null if not found
    `

    const token = await getAccessToken(token_UUID)

    if (token) {
        await delAccessToken(token_UUID)
    }

    return token

}

export {saveAccessToken, delAccessToken, consumeAccessToken, getAccessToken};