import jwt from 'jsonwebtoken';
import { v7 as uuidv7 } from 'uuid';

const generateAccesshToken = (user_uuid: string, secret_key = process.env.ACCESS_TOKEN_SECRET) => {

    `
    Generate a JWT access token with user UUID and access token UUID.

    Parameters:
    - user_uuid (string): The UUID of the user for whom the token is generated.
    - secret_key (string): The secret key used to sign the JWT. Defaults to the ACCESS_TOKEN_SECRET environment variable.

    Returns:
    - string: The signed JWT access token.
    `

    const tokenUUID = uuidv7();

    const token = jwt.sign(
        {
            user_uuid: user_uuid,
            access_token_uuid: tokenUUID
        }, 
        secret_key as string, 
        { 
            expiresIn: '7d',
            issuer: "microservice-auth",
            audience: "microservice-users",
            subject: "user-auth"
        });

    return { accessTokenUUID: tokenUUID, accessToken: token};

}

export default generateAccesshToken;