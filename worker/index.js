// main worker file

import { randomUUID } from 'crypto';
import path from 'path';
import cloneRepo from './cloneRepo.js';
import buildProject from './buildProject.js';
import saveArtifacts from './saveArtifacts.js';
import cleanup from './cleanup.js';
import { createClient } from 'redis';
import { publishLog } from './publishLog.js';


const client = createClient();

const worker = async () => {

    try {
        await client.connect();

        while (true) {

            try {
                console.log("waiting for deployment from client...")

                // generate unique ID
                const uniqueID = randomUUID();
                const projectPath = path.resolve(`./temp/${uniqueID}`)

                
                const deployment = await client.brPop("deployments", 0)
                
                // console.log(JSON.parse(deployment.element))
                const element = JSON.parse(deployment.element)
                await publishLog("Queued")

                await cloneRepo(projectPath, element.repoUrl);
                await publishLog("[SUCCESS] Repository cloned!");

                // detectFramework();

                await publishLog("Building")

                await publishLog("[SUCCESS] installing packages and build...");
                await buildProject(projectPath);
                await publishLog("[SUCCESS] build completed!!");

                await publishLog("Uploading")

                await publishLog("[SUCCESS] created directory for distribution storage");
                await saveArtifacts(projectPath, uniqueID, element.outputDir);
                await publishLog("[SUCCESS] moved dist from clone to bucket");

                await cleanup(projectPath);
                await publishLog("[SUCCESS] delete the project files and the container");

                await publishLog("Ready")
                // updateDeployment():
            } catch (err) {
                console.log("error processing the deployment", err)
            }

        }

    } catch (err) {
        console.log("error connecting to redis", err)
    }

}

worker()