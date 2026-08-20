import connectDb from "../../ConnectDb";
import bcrypt from 'bcryptjs'
import User from "@/models/User";
import Deployment from "@/models/Deployment";
import { v4 as uuidv4 } from 'uuid';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId');
    const deploymentId = searchParams.get('deploymentId');

    console.log({ creatorId, deploymentId });

    await connectDb();

    try {
        if (!deploymentId) {
            return new Response(JSON.stringify({ message: "deploymentId is required" }), { status: 400 });
        }

        const deployment = await Deployment.findOne({ _id: deploymentId });
        console.log(deployment);

        // const userDeployments = await User.findOne({ _id: creatorId }).populate("deployments")
        const userDeployments = await User.findOne({ _id: creatorId }).populate('deployments')
        console.log( "yo wassup ", userDeployments)

        const verification = userDeployments.deployments.filter((element) => {
            return element._id.toString() == deploymentId
        })

        console.log("verification: ", verification)

        // check authorization of the deployment and if the user is trying to access someone else's deployments then block them
        if(Array.isArray(verification) && verification.length == 0){
            return new Response(JSON.stringify({ message: 'unauthorized'}), {status: 401})
        }else{
            return new Response(JSON.stringify({ deployment }), { status: 200 });
        }


    } catch (err) {
        console.log("not able to load deployment ERR:  ", err);
        return new Response(JSON.stringify({ message: "deployment doesnt exist" }), { status: 500 });
    }
}