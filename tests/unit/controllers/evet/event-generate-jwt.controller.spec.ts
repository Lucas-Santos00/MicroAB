import generateJWTController from "../../../../src/crontrollers/event/generate-jwt.controller";
import { FastifyReply } from 'fastify';

const generateJWTServiceMock = jest.fn().mockReturnValue({ 
    code: 200, 
    result: {
        token: "tokensdadas"
    }
});
jest.mock('../../../../src/services/event/generate-jwt.service', () => ({
    __esModule: true,
    default: (jwt: string, teste_uuid: string) => generateJWTServiceMock(jwt, teste_uuid)
}));


const replyMock = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
} as unknown as FastifyReply

describe('', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error if JWT does not exist in body', () => {

        const requestMock = {
            body: {
                jwt: undefined
            },
            params: {
                teste_uuid: '019b28b3-71ae-7627-ab8d-f39cf0ae8ce9'
            }
        } as any

        generateJWTController(requestMock, replyMock)

        expect(replyMock.send).toHaveBeenCalledWith({
        error: true,
        message: 'JWT is required',
        code: 400
    });

    });

    it('should return error if teste_uuid parameter does not exists ', () => {

        const requestMock = {
            body: {
                jwt: 'some-jwt-token'
            },
            params: {
                teste_uuid: undefined
            }
        } as any

        generateJWTController(requestMock, replyMock)

        expect(replyMock.send).toHaveBeenCalledWith({
            error: true,
            message: 'teste_uuid is required',
            code: 400
        })
    });

    it('should call service if all parameters are valid and return code 200', async () => {
        const requestMock = {
            body: {
                jwt: 'some-jwt-token'
            },
            params: {
                teste_uuid: '019b28b3-71ae-7627-ab8d-f39cf0ae8ce9'
            }
        } as any

        await generateJWTController(requestMock, replyMock)

        expect(replyMock.status).toHaveBeenCalledWith(200);
    })

});