import cache_db from "../db/redis/redis";

const saveRefreshToken = async (token_UUID: string, token: string) => {

    `
        Save refresh token in cache with key as token_UUID

        Key: refresh_token:{token_UUID}
        Value: token (string)
        Expiration: 7 days
    `

    const result = await cache_db.set(`refresh_token:${token_UUID}`, token)

    await cache_db.expire(`refresh_token:${token_UUID}`, 7 * 24 * 60 * 60)

    return result

}

const getRefreshToken = async (token_UUID: string) => {

    `
        Get refresh token from cache using token_UUID

        Key: refresh_token:{token_UUID}
        Returns: token (string) or null if not found
    `

    return await cache_db.get(`refresh_token:${token_UUID}`)

}

const delRefreshToken = async (token_UUID: string) => {

    `
        Delete refresh token from cache using token_UUID

        Key: refresh_token:{token_UUID}
        Returns: number of keys that were removed
    `

    return await cache_db.del(`refresh_token:${token_UUID}`)

}

const consumeRefreshToken = async (token_UUID: string) => {

    `
        Consume (get and delete) refresh token from cache using token_UUID

        Key: refresh_token:{token_UUID}
        Returns: token (string) or null if not found
    `

    const token = await getRefreshToken(token_UUID)

    if (token) {
        await delRefreshToken(token_UUID)
    }

    return token

}

export {saveRefreshToken, delRefreshToken, consumeRefreshToken, getRefreshToken};