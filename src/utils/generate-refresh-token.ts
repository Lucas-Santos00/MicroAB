import jwt from 'jsonwebtoken';
import { v7 as uuidv7 } from 'uuid';

const generateRefreshToken = (user_uuid: string, secret_key = process.env.REFRESH_TOKEN_SECRET) => {

    `
        generateRefreshToken: Generates a JWT refresh token with user UUID and a new refresh token UUID.
        
        Parameters:
        - user_uuid (string): The UUID of the user for whom the refresh token is generated.
        - secret_key (string): The secret key used to sign the JWT.

        Returns:
        - string: The generated JWT refresh token.
    `

    return jwt.sign(
        {
            user_uuid: user_uuid,
            refresh_token_uuid: uuidv7()
        }, 
        secret_key as string, 
        { 
            expiresIn: '7d',
            issuer: "microservice-auth",
            audience: "microservice-users",
            subject: "user-auth"
        });

}

export default generateRefreshToken;