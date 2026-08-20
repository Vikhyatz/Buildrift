import connectDb from "../../ConnectDb";
import bcrypt from 'bcryptjs'
import User from "@/models/User";
import Deployment from "@/models/Deployment";
import { v4 as uuidv4 } from 'uuid';
import { createClient } from "redis";

export async function POST(request) {
    const client = createClient();

    client.on("error", (err) => console.error("Redis Client Error", err));
    
    const body = await request.json();
    console.log(body);
    
    await client.connect().catch(console.error);
    
    await connectDb();
    
    try {
        const { branch, build, output, projectName, repository, creatorId } = body
        
        // add a new deployment
        const newDeployment = await Deployment.create({
            projectId: uuidv4(),
            projectName: projectName,
            repoUrl: repository,
            branch: branch,
            buildCommand: build,
            outputDirectory: output,
            creator: creatorId
        })
        
        // append this new deployment in the users deployments
        await User.findByIdAndUpdate(creatorId, {
            $push: { deployments: newDeployment._id }
        })
        console.log("appended deployment")
        
        // push new deployment to redis queue (the server is waiting for new deployment)
        // await client.lPush("deployments", JSON.stringify({
        //     id: newDeployment._id,
        //     repoUrl: repository,
        //     outputDir: output
        // }))

        return new Response(JSON.stringify({ message: "created deployment successfully", depId: newDeployment._id }), { status: 200 })




    } catch (err) {
        console.log("not able to create user ERR:  ", err);
        return new Response(JSON.stringify({ message: "deployment failed" }), { status: 500 })
    }finally{
        await client.quit()
    }

}