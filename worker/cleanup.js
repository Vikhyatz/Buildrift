// cleans up the residual left after the distribution is saved

import fs from "fs/promises"

const cleanup = async (projectPath) => {
    await fs.rm(
        `${projectPath}`,
        {
            recursive: true,
            force: true
        }
    );
    console.log("delete the project files and the container")
}

export default cleanup;