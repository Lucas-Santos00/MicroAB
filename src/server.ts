import "dotenv/config";
import fastify from "fastify";
import fastifyRegisters from "./registers/index";

const app = fastify({ logger: false });

// All registers
await fastifyRegisters(app);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening at ${address}`);
});