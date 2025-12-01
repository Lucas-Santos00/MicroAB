import type { LoginReply } from "../../types/login-reply";
import { getUserByEmail } from "../../repositories/user-repository";
import generateAccesshToken from "../../utils/generate-access-token";
import generateRefreshToken from "../../utils/generate-refresh-token";
import { saveAccessToken } from "../../repositories/access-token-repository";
import { saveRefreshToken } from "../../repositories/refresh-token-repository";
import * as argon2 from "argon2";

const loginService = async (email: string, password: string): Promise<LoginReply> => {

    const [user] = await getUserByEmail(email);

    if(!user){
        return { code: 401, error: true, message: 'Invalid credentials', accessToken: '', refreshToken: '' };
    }

    const isValidPassword = await argon2.verify(user.password_hash, password);

    if(!isValidPassword){
        return { code: 401, error: true, message: 'Invalid credentials', accessToken: '', refreshToken: '' };
    }

    const {accessToken, accessTokenUUID} = generateAccesshToken(user.uuid, user.email);
    const {refreshToken, refreshTokenUUID} = generateRefreshToken(user.uuid, user.email);

    // Inserir tokens no Redis
    // Para que inserir no banco? Gerar e retornar direto?
    const savedAcessToken = await saveAccessToken(accessTokenUUID, accessToken);
    const savedRefreshToken = await saveRefreshToken(refreshTokenUUID, refreshToken);

    if(savedAcessToken != 'OK' || savedRefreshToken != 'OK'){
        return { code: 500, error: true, message: 'Internal server error', accessToken: '', refreshToken: '' };
    }

    return { code: 200, accessToken, refreshToken };

}

export default loginService;