import connectDb from "@/app/ConnectDb";
import User from "@/models/User";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    // console.log(userId)
    await connectDb();

    const user = await User.findById( userId )
    console.log(user.activity)

    return new Response(JSON.stringify({ activity: user.activity }), { status: 200 });
}