// main worker file

import { randomUUID } from 'crypto';
import path from 'path';
import cloneRepo from './cloneRepo.js';
import buildProject from './buildProject.js';
import saveArtifacts from './saveArtifacts.js';
import cleanup from './cleanup.js';
import { createClient } from 'redis';

const uniqueID = randomUUID();
const projectPath = path.resolve(`./temp/${uniqueID}`)

const client = createClient();

const worker = async () => {

    try {
        await client.connect();

        while (true) {

            try {
                console.log("waiting for deployment from client...")
                const deployment = await client.brPop("deployments", 0)

                // console.log(JSON.parse(deployment.element))
                const element = JSON.parse(deployment.element)
                await cloneRepo(projectPath, element.repoUrl);
                //// detectFramework();
                await buildProject(projectPath);
                await saveArtifacts(projectPath, uniqueID);
                await cleanup(projectPath);
                //// updateDeployment():
            } catch (err) {
                console.log("error processing the deployment", err)
            }

        }

    } catch (err) {
        console.log("error connecting to redis", err)
    }

}

worker()