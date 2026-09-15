import connectDb from "@/app/ConnectDb";
import User from "@/models/User";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    // console.log(userId)
    await connectDb();

    const user = await User.findById( userId ).populate("deployments")
    console.log(user.deployments)

    return new Response(JSON.stringify({ deployments: user.deployments }), { status: 200 });
}