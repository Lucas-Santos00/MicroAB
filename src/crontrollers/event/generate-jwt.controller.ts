import type { FastifyReply, FastifyRequest } from "fastify";
import generateJWTService from "../../services/event/generate-jwt.service";

const generateJWTController = async (request: FastifyRequest, reply: FastifyReply) => {

    const { jwt } = request.body as { jwt?: string };
    const { teste_uuid } = request.params as { teste_uuid?: string };

    if (!jwt) {
        return reply.status(400).send({ error: true, message: 'JWT is required', code: 400 });
    }

    if (!teste_uuid) {
        return reply.status(400).send({ error: true, message: 'teste_uuid is required', code: 400 });
    }

    const result = await generateJWTService(jwt, teste_uuid);

    return reply.status(result.code).send(result);

};

export default generateJWTController;