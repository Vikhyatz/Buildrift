import connectDb from "../../ConnectDb";
import bcrypt from 'bcryptjs'
import User from "@/models/User";

export async function DELETE(request) {
    await connectDb();

    const body = await request.json();

    
    const userId = body.userId;
    console.log("this is the userID", userId);

    try{
        const deleteUser = await User.findByIdAndDelete(userId)

        return new Response(JSON.stringify({ message: "deleted User"}), {status: 200})
    }catch(err){
        console.log("not able to delete user ERR:  ", err);
        return new Response(JSON.stringify({ message: "not able to delete user right now"}), {status: 500})
    }

}