import "dotenv/config";
import fastify from "fastify";
import routes from "./routes/index";

const app = fastify(/*{ logger: true }*/);

app.setErrorHandler((error, request, reply) => {
    app.log.error(`Error occurred: ${error.message}`);
    reply.status(500).send({ error: 'Internal Server Error' });
});

await routes(app);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening at ${address}`);
});