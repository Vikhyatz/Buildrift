import { createClient } from "redis";
import { eventEmitter } from "../logs";

export async function startSubscriber() {
    let subscriber = createClient()

    subscriber.on("error", (err) => console.error("Redis Client Error", err));

    await subscriber.connect();

    await subscriber.subscribe(
        "deployments-events",
        (message) => {
            const event = JSON.parse(message);

            console.log("deployment logs:", event);
            eventEmitter.emit("message", event)

        }
    );

    console.log("redis subscriber started.")
}