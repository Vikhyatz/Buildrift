import { createClient } from "redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    const encoder = new TextEncoder();

    const subscriber = createClient({
        url: process.env.REDIS_URL,
    });

    subscriber.on("error", (err) => {
        console.error("Redis subscriber error:", err);
    });

    await subscriber.connect();

    console.log("SSE Redis subscriber connected");

    const stream = new ReadableStream({
        async start(controller) {

            const send = (data) => {
                try {
                    controller.enqueue(
                        encoder.encode(
                            `data: ${JSON.stringify(data)}\n\n`
                        )
                    );
                } catch (error) {
                    console.error("SSE send error:", error);
                }
            };

            // Immediately tell browser that SSE is alive
            send({
                type: "connected"
            });

            await subscriber.subscribe(
                "deployments-events",
                (message) => {

                    console.log(
                        "Message received from Redis:",
                        message
                    );

                    const event = JSON.parse(message);

                    send(event);
                }
            );

            console.log("SSE subscribed to deployment-events");
        },

        async cancel() {

            console.log("SSE connection closed");

            try {
                await subscriber.unsubscribe(
                    "deployments-events"
                );

                await subscriber.quit();
            } catch (error) {
                console.error(
                    "Redis cleanup error:",
                    error
                );
            }
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    });
}