export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { startSubscriber } =
            await import("./lib/redis/subscriber");

        await startSubscriber();
    }
}