// clone repo and download all the files
import run from "./run.js";

const cloneRepo = async (projectPath, repoUrl) => {
    await run("git", [
        "clone",
        repoUrl,
        `${projectPath}`
    ]);
    
}

export default cloneRepo;