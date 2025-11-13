import type { LoginReply } from "../../types/login-reply";
import type { ErrorReply } from "../../types/error-reply";

const loginService = async (email: string, password: string): Promise<LoginReply | ErrorReply > => {

    // Comparar senha com o hash no banco, buscando o usuário pelo email
    // Se válido, gerar tokens (access e refresh) e retornar
    // Se inválido, lançar erro

    return { code: 200, accessToken: "access_token_example", refreshToken: "refresh_token_example" };

}

export default loginService;