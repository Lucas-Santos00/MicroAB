import type { FastifyRequest } from 'fastify';

export default {
    max: 5,
    ban: 3,
    timeWindow: '1 minute',
    keyGenerator: (req: FastifyRequest) => req.ip,
    allowList: ['127.0.0.1'],
    errorResponseBuilder: (req: FastifyRequest, context: any) => {
    return {
        statusCode: 429,
        message: 'Too many requests',
        max: context.max,
        expiresIn: context.ttl
    }
}}