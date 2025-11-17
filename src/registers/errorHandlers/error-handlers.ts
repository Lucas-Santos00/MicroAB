import type { FastifyInstance } from "fastify";


const errorHandlers = (app: FastifyInstance) => {

    app.setErrorHandler((error, request, reply) => {

        if (error.statusCode === 429) {
            reply.status(429).send(error);
            return;
        }

        app.log.error(`Error occurred: ${error.message}`);
        console.log(`Error occurred: ${error.message}`);
        reply.status(500).send({ error: 'Internal Server Error' });
    });

    app.setNotFoundHandler({
        preHandler: app.rateLimit({
            max: 5,
            timeWindow: '1 minute'
        })
        }, function (request, reply) {
            reply.code(404).send({ error: 'Not found' })
        }
    )
}

export default errorHandlers;