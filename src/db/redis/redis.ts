import "dotenv/config";
import { createClient, type RedisClientType } from "redis";

const cache_db: RedisClientType = createClient({
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: process.env.REDIS_HOST!,
    port: 10849,
  },
});

cache_db.on("error", (err) => console.log("Redis Client Error", err));

cache_db.connect();

export default cache_db;
