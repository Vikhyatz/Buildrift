import connectDb from "../../ConnectDb";
import bcrypt from 'bcryptjs'
import User from "@/models/User";



export async function POST(request) {
    await connectDb();

    const body = await request.json();

    console.log(body);

    const userId = body.userId;
    const updatedName = body.updatedName

    try{
        const updateName = await User.findByIdAndUpdate(
            userId,
            {name: updatedName}
        )

        return new Response(JSON.stringify({ message: "updated user name", newName: updatedName}), {status: 200})
    }catch(err){
        console.log("not able to update user name ERR:  ", err);
        return new Response(JSON.stringify({ message: "not able to update user name"}), {status: 500})
    }

}