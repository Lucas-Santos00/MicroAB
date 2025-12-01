import { saveUserCredentials } from "../../repositories/user-repository";
import generateAccessToken from "../../utils/generate-access-token";
import generateRefreshToken from "../../utils/generate-refresh-token";
import { saveAccessToken } from "../../repositories/access-token-repository";
import { saveRefreshToken } from "../../repositories/refresh-token-repository";
import argon2 from "argon2";
import { v7 as uuidv7 } from 'uuid';

type RegisterResult = {
    error?: boolean;
    code: number;
    message: string;
    accessToken: string;
    refreshToken: string;
}

const registerService = async (email: string, password: string, username: string): Promise<RegisterResult> => {

    const UserUuid = uuidv7();

    const hashedPassword = await argon2.hash(password);

    await saveUserCredentials(UserUuid, email, hashedPassword, username);

    // generate tokens
    const {accessToken, accessTokenUUID} = generateAccessToken(UserUuid, email);
    const {refreshToken, refreshTokenUUID} = generateRefreshToken(UserUuid, email);

    // Inserir tokens no Redis
    const savedAcessToken = await saveAccessToken(accessTokenUUID, accessToken);
    const savedRefreshToken = await saveRefreshToken(refreshTokenUUID, refreshToken);

    if(savedAcessToken != 'OK' || savedRefreshToken != 'OK'){
        return { code: 500, error: true, message: 'Internal server error', accessToken: '', refreshToken: '' };
    }

    // Devemos remover do banco o usuário inserido caso haja falha ao salvar os tokens? (Validar)

    return {
        code: 201,
        message: 'User registered successfully',
        accessToken,
        refreshToken
    };

}

export default registerService;