import { createClient } from "redis";

export const publisher = createClient({
    url: process.env.REDIS_URL,
});

publisher.on("error", (err) => {
    console.error("publisher Error:", err);
});

await publisher.connect();
