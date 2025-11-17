import "dotenv/config";
import fastify from "fastify";
import routes from "./routes/index";
import fastifyCookie, { type FastifyCookieOptions } from "@fastify/cookie";
import rateLimit from "@fastify/rate-limit";

const app = fastify({ logger: false });

await app.register(rateLimit, {
    global: false, // If true, applies to all routes
});

await app.register(fastifyCookie, {
    secret: process.env.APPLICATION_SECRET || 'default'
} as FastifyCookieOptions)

app.setErrorHandler((error, request, reply) => {

    if (error.statusCode === 429) {
        reply.status(429).send(error);
        return;
    }

    app.log.error(`Error occurred: ${error.message}`);
    reply.status(500).send({ error: 'Internal Server Error' });
});

await routes(app);

app.setNotFoundHandler({ //
    preHandler: app.rateLimit({
        max: 5,
        timeWindow: '1 minute'
    })
}, function (request, reply) {
    reply.code(404).send({ error: 'Not found' })
})

const PORT: number = Number(process.env.PORT) || 3000;

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening at ${address}`);
});