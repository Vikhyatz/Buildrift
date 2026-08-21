import { eventEmitter } from "@/lib/logs";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {

      const send = (data) => {
        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify(data)}\n\n`
            )
          );
        } catch (error) {
          console.error("Failed to send SSE:", error);
        }
      };

      // IMPORTANT: receive the event data
      const listener = (data) => {
        console.log("Sending SSE event:", data);
        send(data);
      };

      eventEmitter.on("message", listener);

      // Tell browser connection succeeded
      send({
        type: "connected"
      });

      // Keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(
            encoder.encode(": heartbeat\n\n")
          );
        } catch {
          clearInterval(heartbeat);
        }
      }, 15000);

      // Store cleanup somewhere we can access it
      this.cleanup = () => {
        clearInterval(heartbeat);
        eventEmitter.off("message", listener);
      };
    },

    cancel() {
      // The client disconnected.
      // Cleanup is handled below if needed.
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}