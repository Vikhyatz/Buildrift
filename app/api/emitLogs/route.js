import { eventEmitter } from "@/lib/events";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      };

      const listener = () => {
        send(data);
      };

      eventEmitter.on("message", listener);

      // Tell the browser that the connection is alive
      send({ type: "connected" });

      return () => {
        eventEmitter.off("message", listener);
      };
    },

    cancel() {
      // cleanup if necessary
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}