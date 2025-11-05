import "dotenv/config";
import fastify from "fastify";
import routes from "./routes/index";

const app = fastify();
app.register(routes);

const PORT: number = Number(process.env.PORT) || 3000;

app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server listening at ${address}`);
});