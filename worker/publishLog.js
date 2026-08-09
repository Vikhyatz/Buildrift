import { publisher } from './redis.js'

export async function publishLog(message) {
    // add deployment ID
    await publisher.publish(
        "deployments-events",
        JSON.stringify({
            type: "LOG",
            message
        })
    );
}