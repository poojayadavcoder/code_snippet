import 'dotenv/config';
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;
console.log(redisUrl)
const client = createClient({
  url: redisUrl,
});


client.on("error", (err) => console.log("Redis Error", err));

await client.connect();

export default client;



