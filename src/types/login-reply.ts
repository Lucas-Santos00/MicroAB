export type LoginReply = {
    error?: boolean;
    message?: string;
    code: number;
    accessToken: string;
    refreshToken: string;
}