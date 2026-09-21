import connectDb from "../../ConnectDb";
import bcrypt from 'bcryptjs'
import User from "@/models/User";
import Deployment from "@/models/Deployment";

export async function POST(request) {
    await connectDb();

    const body = await request.json();

    console.log(body);

    const logs = body.logs;
    const status = body.status
    const depId = body.depId

    try {
        const updateDeployment = await Deployment.findByIdAndUpdate(
            depId,
            {status: status, logs: logs}
        )

        // return new Response(JSON.stringify({ message: "updated user name", newName: updatedName}), {status: 200})
        return new Response(JSON.stringify({ message: "updated deployment", updateDeployment: updateDeployment }), { status: 200 })

    } catch (err) {
        console.log("not able to update user name ERR:  ", err);
        return new Response(JSON.stringify({ message: "not able to update user name" }), { status: 500 })
    }

}