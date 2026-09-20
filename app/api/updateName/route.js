import connectDb from "../../ConnectDb";
// import bcrypt from 'bcryptjs'
// import User from "@/models/User";
import Deployment from "@/models/Deployment";



export async function POST(request) {
    await connectDb();

    const body = await request.json();

    console.log(body);

    const status = body.status;
    const logs = body.logs

    try{
        const updateDeployment = await Deployment.findByIdAndUpdate(
            userId,
            {name: updatedName}
        )

        return new Response(JSON.stringify({ message: "updated user name", newName: updatedName}), {status: 200})
    }catch(err){
        console.log("not able to update user name ERR:  ", err);
        return new Response(JSON.stringify({ message: "not able to update user name"}), {status: 500})
    }

}