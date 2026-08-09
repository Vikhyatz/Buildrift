// use docker to run a new container for the cloned repo and install all the dependencies

import run from "./run.js";

const buildProject = async (projectPath) => {
    console.log("installing packages and build...")
    await run("docker", [
        "run",
        "--rm",
        "-v",
        `${projectPath}:/app`,
        "-w",
        "/app",
        "node:22",
        "sh",
        "-c",
        "npm install && npm run build"
    ]);

    console.log("Build completed!");
}

export default buildProject;